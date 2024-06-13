import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import router from "./routes/index.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running on http://localhost:8000");
await app.listen({ port: 8000 });