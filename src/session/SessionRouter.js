import express from "express";
import passport from "./SessionMidelwares.js";
import SessionController from "./SessionController.js";
import { upload } from "../utils/multer.js"
import { isAdmin } from "../utils/isAdmin.js";

const routerSession = express.Router();
const controller = new SessionController();

routerSession.get("/user", controller.getUser);
routerSession.post(
  "/create",
  upload.single("avatar"),
  passport.authenticate("createNewUser"),
  controller.createNewUser
);
routerSession.post(
  "/validate",
  passport.authenticate("validateLogin"),
  controller.validate
);
routerSession.get('/logout', controller.logout)

export default routerSession;
