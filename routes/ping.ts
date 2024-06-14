import { Context, Response } from "file:///src/deps.ts";
import { http } from "file:///src/utils/request.ts";

export async function ping(ctx: Context): Promise<Response> {
    const data = await http.get("https://v1.hitokoto.cn/?charset=utf-8");
    return data;
}