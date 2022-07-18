import { session } from '../daos/index'
import bcrypt from 'bcrypt'
import passport from 'passport'
import localStrategy from 'passport-local'

const LocalStrategy = localStrategy.Strategy

passport.use('login', new LocalStrategy(async (
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

/*
  Candot engo que escribir una sesion, me pasan req.user y elijo
  que guardar en la sesion, en este caso es el username.
*/

passport.serializeUser((usuario, callback) => {
  callback(null, usuario.email);
});

/*
  Cuando tengo que leer una sesion, agarro lo que esta en la sesion
  y decido como reconstruir req.user
*/

passport.deserializeUser(async (email, callback) => {
  const userdb = await session.getAll()
  const user = userdb.find(usr => usr.email === email);
  callback(null, user);
});


export {passport}


// export const getSessions = async (res) => {
//   try {
//     return res.send(await session.getAll())
//   } catch (err) {
//     return res.send({ err })
//   }
// }



// export const validateSession = async (req, res) => {
//   const email = req.body.email
//   const passwordPlanned = req.body.password
//   const dataSessions = await session.getAll()
//   const userData = dataSessions.find(x => x.email === email)
  
//   if (userData !== undefined) {
//     const passwordHash = userData.password
//     bcrypt.compare(passwordPlanned, passwordHash, async (err, result) => {
//       if (err) return err
//       return res.send({data: {loginEnabled: result}})
//     })
//   } else {
//     return res.send({data: 'user or password are incorrect'})
//   }
// }

// const validatePassword = (email, password) => {
//   return bcrypt.compare(password, email.password)
// }

// export const validatePrueba = (res) => {

// }

// passport.use('login', new LocalStrategy(
//   async (email, password, done) => {
//     await session.getAll().find(x => x.email === email), (err, user) => {
//       if (err) return done(err)
//       if (!user) {
//         console.log('user not found ', user)
//         return done(null, false)
//       }
//       // if (!validatePassword(email, password)) {

//       // }
//       return done(null, user)
//     }

//   }
// )) 
