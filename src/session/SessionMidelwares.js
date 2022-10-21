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
          isAdmin: false
        };
        const saved = await session.save(userSession);
        return done(null, saved);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "validateLogin",
  new LocalStrategy(async (username, password, done) => {
    const userInDB = await session.getAll();
    const user = userInDB.find((u) => u.username === username);

    if (!user || !(await bcrypt.compare(password.toString(), user.password)))
      return done("User or password incorrect");

    return done(null, user);
  })
);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser(async (user, done) => {
  const userdb = await session.getAll();
  const find = userdb.find((x) => x.username === user.username);
  done(null, find);
});

export default passport;
