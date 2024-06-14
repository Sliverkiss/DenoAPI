import { Context } from "file:///src/deps.ts";

export function ping(ctx: Context) {
    return import.meta.url;
}