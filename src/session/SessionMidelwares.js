import bcrypt from "bcrypt";
import passport from "passport";
import localStrategy from "passport-local";
import SessionFactory from "./SessionFactory.js";
import config from "../utils/config.js";

const LocalStrategy = localStrategy.Strategy;
const session = SessionFactory.create(config.mongobd.persistence);

passport.use(
  "createNewUser",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      const { name, phone } = req.body;

      if (name === undefined || phone === undefined)
        return done("Some data is missing");

      const userInDB = await session.getAll();
      const isUserInDB = userInDB.find((u) => u.username === username);

      if (isUserInDB) return done("User already exists!");

      try {
        const hash = bcrypt.hashSync(
          password.toString(),
          bcrypt.genSaltSync(10)
        );

        const userSession = {
          username,
          password: hash,
          name,
          phone,
          avatar: req.file?.filename,
        };
        const saved = await session.save(userSession);
        return done(null, saved);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// passport.use(
//   "validateLogin",
//   new LocalStrategy(async (email, password, callback) => {
//     const userdb = await session.getAll();
//     const user = userdb.find((u) => u.email === email);
//     if (!user || !(await bcrypt.compare(password.toString(), user.password)))
//       return callback(new Error("User or password incorrect"));
//     callback(null, user);
//   })
// );

/*
  Cando tengo que escribir una sesion, me pasan req.user y elijo
  que guardar en la sesion, en este caso es el username.
*/

passport.serializeUser((user, done) => done(null, user.username));

/*
  Cuando tengo que leer una sesion, agarro lo que esta en la sesion
  y decido como reconstruir req.user
*/

passport.deserializeUser(async (user, done) => {
  const userdb = await session.getAll();
  const find = userdb.find((user) => user.username === username.username);
  done(null, find);
});

export default passport;
