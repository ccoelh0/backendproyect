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

const app = express();

const Session = session({
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 6000000 },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(coockieParser());
app.use(Session);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", routes);
app.use(handleError);

const server = http.createServer(app);

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
