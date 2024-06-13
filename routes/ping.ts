import { Context } from "file:///src/deps.ts";

export function ping(context: Context) {
  return import.meta.url;
}
