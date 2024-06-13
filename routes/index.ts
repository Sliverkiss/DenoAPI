import { Router } from "file:///src/deps.ts";
import pingRouter from "file:///src/routes/ping.ts";

const router = new Router();

router.use(pingRouter.routes(), pingRouter.allowedMethods());

export default router;