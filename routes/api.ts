import { Request, Response } from "file:///src/deps.ts";
import { ping } from "file:///src/routes/ping.ts";
import { status } from "file:///src/routes/status.ts";


const config: Record<string, (req: Request) => Response | Promise<Response>> = {
    '/ping': ping,
    '/status': status,
}

/**
 * 处理前端api请求
 * @param api
 * @param req
 */
export function routeApi(api: string, req: Request): Response | Promise<Response> {
    if (api in config) {
        return config[api](req)
    } else {
        return new Response(null, {
            status: 502,
        })
    }
}