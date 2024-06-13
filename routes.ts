// routes.ts
import { fs, path } from "file:///src/deps.ts";

interface RouteConfig {
  [key: string]: (req: Request) => Response | Promise<Response>;
}

async function collectRoutes(dir: string, basePath: string = ""): Promise<RouteConfig> {
  const routes: RouteConfig = {};
  for await (const entry of fs.walk(dir, { includeDirs: false, followSymlinks: false })) {
    if (entry.isFile && entry.path.endsWith(".ts")) {
      const relativePath = path.relative(Deno.cwd(), entry.path);
      const modulePath = `file://${path.resolve(Deno.cwd(), relativePath)}`;
      const { default: fileMethods } = await import(modulePath);
      const routePath = `${basePath}${path.relative(dir, entry.path).replace(".ts", "").replace(/\\/g, "/")}`;
      console.log(routePath);
      routes[routePath] = fileMethods; // 假设所有模块都有一个默认导出
    } else if (entry.isDirectory) {
      const subRoutes = await collectRoutes(entry.path, `${basePath}${entry.name}/`);
      Object.assign(routes, subRoutes);
    }
  }
  return routes;
}

export async function routeApi(api: string, req: Request): Promise<Response> {
  const routes = await collectRoutes(path.join(Deno.cwd(), "service"));
  if (api in routes) {
    return routes[api](req);
  } else {
    return new Response(null, { status: 502 });
  }
}