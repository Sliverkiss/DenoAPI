import { Context } from "file:///src/deps.ts";

export function ping(context: Context) {
  context.response.body = import.meta.url;
}
