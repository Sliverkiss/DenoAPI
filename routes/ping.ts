import { Context } from "file:///src/deps.ts";

export function ping(ctx: Context) {
  ctx.response.body= import.meta.url;
}