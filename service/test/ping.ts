import { Context } from "file:///src/deps.ts";

export default function ping(context: Context) {
  return import.meta.url;
}
