import * as url from "url";
import dotenv from "dotenv";
import path from "path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const urlToFindEnv = (__dirname, process.env.NODE_ENV + ".env")
  .split(/\s+/)
  .join("");

dotenv.config({ path: path.resolve(urlToFindEnv) });

export default {
  db: {
    connectionLocalHost: "mongodb://localhost:27017/mangabd",
    connectionAtlas: process.env.CONNECTION_MONGO_ATLAS,
    persistence: "MONGO",
  },
  env: process.env.ENV || "development",
  host: process.env.HOST || "127.0.0.1",
  port: process.env.PORT || 8080,
  session: {
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 6000000 },
  },
};
