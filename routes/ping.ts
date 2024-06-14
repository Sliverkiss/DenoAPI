import { Context, Response } from "file:///src/deps.ts";

export async function ping(ctx: Context): Promise<Response> {
  return new Response(import.meta.url, {
    status: 200,
  });
}