import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";

const router = new Router();

router.get("/ping", (context) => {
  context.response.body = "pong";
});

export default router;