import express from "express";
import routerSession from "./session/SessionRouter.js";
import routesForItems from "./item/ItemRouter.js";
import routerCart from "./cart/CartRoute.js";
import routerChat from "./chat/ChatRouter.js";
import swaggerConfig from "../docs/swagger.config.js";

const router = express.Router();
const url = "/api";

router.use(url + "/sessions", routerSession);
router.use(url + "/items", routesForItems);
router.use(url + "/cart", routerCart);
router.use(url + "/chat", routerChat);
router.use(url + "-docs/", swaggerConfig.serve, swaggerConfig.setup);

export default router;
