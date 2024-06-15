import { Request, Response } from "file:///src/deps.ts";
import { http } from "file:///src/utils/request.ts";

export async function ping(req: Request): Promise<Response> {
    const data = await http.get("https://v1.hitokoto.cn/?charset=utf-8");
    return data;
}