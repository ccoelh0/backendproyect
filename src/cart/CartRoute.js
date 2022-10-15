import express from "express";
import CartController from "./CartController.js";

const router = express.Router();
const controller = new CartController();

router.post("/", controller.createNewCart); //ready
router.get("/", controller.getCart); // raedy
router.get("/:id", controller.getCart); // ready 
router.get("/:id/items", controller.getItemsFromCart); // ready 
router.delete("/:id", controller.deleteCart); // ready
router.post("/:id/items/:idItem", controller.addItemsToCart); // ready
router.delete("/:id/items/:idItem", controller.deleteItemFromCart); // ready
router.post("/buy-cart/:idCart", controller.buyCart); // 

const routerCart = router;

export default routerCart;
