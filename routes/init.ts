
import { Context, Response, send, join } from "file:///src/deps.ts";

export async function ping(ctx: Context): Promise<Response> {
    const filePath = join(Deno.cwd(), "public", "index.html");
    console.log(filePath);
    await send(ctx, filePath);
}