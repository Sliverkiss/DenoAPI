import { Router } from "oak";

const router = new Router();

router.get("/ping", (context) => {
  context.response.body = "pong";
});

export default router;