import { session } from '../daos/index'
import bcrypt from 'bcrypt'
import passport from 'passport'
import localStrategy from 'passport-local'

const LocalStrategy = localStrategy.Strategy

passport.use('createUser', new LocalStrategy(async (
  email, 
  password, 
  callback
) => {
  const userdb = await session.getAll()
  const isUserInDB = userdb.find(u => u.email === email)
  if (isUserInDB) return callback(new Error('user exists in bd'))

  try {
    const hash = bcrypt.hashSync(password.toString(), bcrypt.genSaltSync(10));
    const userSession = {email, password: hash}
    await session.save(userSession)
    return callback(null, userSession)
  }  catch (error) {
    return callback(error)
  }
}))

passport.use('validateLogin', new LocalStrategy(async (
  email, 
  password, 
  callback
) => {
  const userdb = await session.getAll()
  const user = userdb.find(u => u.email === email);
  if (!user || !await bcrypt.compare(password.toString(), user.password)) return callback(new Error('User or password incorrect'));
  callback(null, user);
}))

/*
  Candot engo que escribir una sesion, me pasan req.user y elijo
  que guardar en la sesion, en este caso es el username.
*/

passport.serializeUser((user, callback) => callback(null, user.email))

/*
  Cuando tengo que leer una sesion, agarro lo que esta en la sesion
  y decido como reconstruir req.user
*/

passport.deserializeUser(async (email, callback) => {
  const userdb = await session.getAll()
  const user = userdb.find(user => user.email === email);
  callback(null, user);
});

export const logout = (req, res) => {
  req.session.destroy()
  return res.send({data: true})
}


export default passport