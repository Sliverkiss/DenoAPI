import { Context, Response } from "file:///src/deps.ts";

export async function ping(ctx: Context): Promise<Response> {
  return import.meta.url
}