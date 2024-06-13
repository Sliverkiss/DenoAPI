import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import pingRouter from "./ping.ts";

const router = new Router();

router.use(pingRouter.routes(), pingRouter.allowedMethods());

export default router;