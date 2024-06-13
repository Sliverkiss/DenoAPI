import { Router } from "oak";
import pingRouter from "./ping.ts";

const router = new Router();

router.use(pingRouter.routes(), pingRouter.allowedMethods());

export default router;