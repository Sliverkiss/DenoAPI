import { Application } from "file:///src/deps.ts";
import * as router from "file:///src/routes/index.ts";

const app = new Application();

app.use(async (ctx) => {
   ctx.response.body= await router.routeApi(ctx.request.url.pathname, ctx.request);
});

console.log("Server is running on http://localhost:8000");
await app.listen({ port: 8000 });

