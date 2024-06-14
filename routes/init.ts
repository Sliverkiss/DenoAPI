
import { Context, Response, send, join } from "file:///src/deps.ts";

export async function init(ctx: Context): Promise<Response> {
    const filePath = '../public/index.html'
    console.log(filePath);
    await send(ctx, filePath);
}