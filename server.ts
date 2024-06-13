import { Application } from "file:///src/deps.ts";
import router from "file:///src/routes/index.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running on http://localhost:8000");
await app.listen({ port: 8000 });