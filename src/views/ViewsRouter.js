import express from "express";
import isAdmin from "../utils/isAdmin.js";

const router = express.Router();
const root = { root: "." };

router.get("/login", (_, res) => res.sendFile("/public/login.html", root));
router.get("/", (req, res) => res.sendFile("/public/index.html", root));
// router.get("/admin", isAdmin, (req, res) =>
//   res.sendFile("/public/admin.html", root)
// );

router.get("/admin", (req, res) =>
  res.sendFile("/public/admin.html", root)
);

const routerViews = router;

export default routerViews;
