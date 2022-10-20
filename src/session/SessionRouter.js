import express from "express";
import passport from "./SessionMidelwares.js";
import SessionController from "./SessionController.js";
import { upload } from "../utils/multer.js";

const routerSession = express.Router();
const controller = new SessionController();

routerSession.get("/user", controller.getUser);
routerSession.post(
  "/createNewUser",
  upload.single("avatar"),
  passport.authenticate("createNewUser"),
  controller.createNewUser
);


// routerSession.post('/validateLogin', passport.authenticate('validateLogin'), validateLogin)
// routerSession.get('/logout', logout)

export default routerSession;