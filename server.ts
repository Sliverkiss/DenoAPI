import { Application } from "file:///src/deps.ts";
import * as router from "file:///src/routes/api.ts";

const app = new Application();

//app.use(async (ctx) => {
//    await router.routeApi(ctx.request.url.pathname, ctx.request);
//});

app.use(async (ctx) => {
  ctx.response.body = ctx.request.url.pathname;
});

console.log("Server is running on http://localhost:8000");
await app.listen({ port: 8000 });

