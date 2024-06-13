// routes/index.ts

import { fs, path } from "../deps.ts";

interface RouteConfig {
    [key: string]: (req: Request) => Response | Promise<Response>;
}

async function collectRoutes(dir: string, basePath: string = ""): Promise<RouteConfig> {
    const routes: RouteConfig = {};
    const absoluteDir = path.join("file:///src", dir); // 替换为你的项目路径
    for await (const entry of fs.walk(absoluteDir, { includeDirs: true })) {
        if (entry.isFile && entry.path.endsWith(".ts")) {
            const { default: fileMethods } = await import("file://" + entry.path);
            const routePath = `${basePath}${path.relative(absoluteDir, entry.path).replace(".ts", "").replace(/\\/g, "/")}`;
            routes[routePath] = fileMethods.default; // 假设所有模块都有一个默认导出
        } else if (entry.isDirectory) {
            const subRoutes = await collectRoutes(path.relative(absoluteDir, entry.path), `${basePath}${entry.name}/`);
            Object.assign(routes, subRoutes);
        }
    }
    return routes;
}

export async function routeApi(api: string, req: Request): Promise<Response> {
    const routes = await collectRoutes("/service");
    if (api in routes) {
        return routes[api](req);
    } else {
        return new Response(null, { status: 502 });
    }
}