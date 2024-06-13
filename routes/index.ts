// routes/index.ts
import { join, relative,walk } from "file:///src/deps.ts";

interface RouteConfig {
    [key: string]: (req: Request) => Response | Promise<Response>;
}

async function collectRoutes(dir: string, basePath: string = ""): Promise<RouteConfig> {
    const routes: RouteConfig = {};
    for await (const entry of walk(dir, { includeDirs: true })) {
        if (entry.isFile && entry.path.endsWith(".ts")) {
            const { default: fileMethods } = await import(entry.path);
            const routePath = `${basePath}${relative(dir, entry.path).replace(".ts", "").replace(/\\/g, "/")}`;
            routes[routePath] = fileMethods.default; // 假设所有模块都有一个默认导出
        } else if (entry.isDirectory) {
            const subRoutes = await collectRoutes(entry.path, `${basePath}${entry.name}/`);
            Object.assign(routes, subRoutes);
        }
    }
    return routes;
}

export async function routeApi(api: string, req: Request): Promise<Response> {
    const routes = await collectRoutes(join("file:///src", "service"));
    if (api in routes) {
        return routes[api](req);
    } else {
        return new Response(null, { status: 502 });
    }
}