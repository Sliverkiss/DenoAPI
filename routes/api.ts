import { Request, Response } from "file:///src/deps.ts";
import { ping } from "file:///src/routes/ping.ts";
import {init } from "file:///src/routes/init.ts";


const config: Record<string, (req: Request) => Response | Promise<Response>> = {
    '/ping': ping,
    '/': init,
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