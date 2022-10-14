import express from 'express'
import routerSession from "./session/SessionRouter.js";
// import routesForViews from "./utils/ViewRouter.js";
import routesForItems from "./item/ItemRouter.js";
import routerCart from "./cart/CartRoute.js";
import routerChat from "./chat/ChatRouter.js";

const router = express.Router();
const url = '/api'

router.use(url + "/sessions", routerSession);
router.use(url + "/items", routesForItems);
router.use(url + "/cart", routerCart);
router.use(url + "/chat", routerChat);
// router.use("/", routesForViews);

export default router;