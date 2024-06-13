import { Router } from "file:///src/deps.ts";

const router = new Router();

router.get("/ping", (context) => {
  context.response.body = import.meta.url;
});

export default router;