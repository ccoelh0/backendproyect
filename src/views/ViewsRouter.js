import express from "express";
import isAdmin from "../utils/isAdmin.js";
import controller from "./ViewController.js";

const router = express.Router();

router.get("/login", controller.returnLogin);
router.get("/", controller.returnLogin);
router.get("/admin", isAdmin, controller.returnLogin);
router.get("/chat", controller.returnChat);

const routerViews = router;

export default routerViews;