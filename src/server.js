import "./config.js";
import express from "express";
import http from "http";
import coockieParser from "cookie-parser";
import session from "express-session";
import passport from "./session/SessionMidelwares.js";
import cluster from "cluster";
import os from "os";
import routes from "./routes.js";
import handleError from "./utils/errorHandler.js";
import { Server } from 'socket.io';
import { initialize } from "./chat/ChatRouter.js";
import config from "./config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(coockieParser());
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", routes);
app.use(handleError);

const server = http.createServer(app);
const io = new Server(server);

initialize(io)

const port = process.env.PORT || 8090;

if (process.env.MODE === "CLUSTER" && cluster.isPrimary) {
  for (let i = 0; i <= os.cpus().length; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => console.log(worker.process.pid, "died"));
} else {
  server.listen(port, () =>
    console.log(`>>> ✅ Server is running in localhost:${port}`)
  );
}
