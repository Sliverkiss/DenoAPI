import { Context } from "file://src/deps.ts";

function ping(context: Context) {
  context.response.body = import.meta.url;
}

export { ping };