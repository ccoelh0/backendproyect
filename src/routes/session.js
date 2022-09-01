import express from 'express'
import passport, {logout, newUserWasCreated} from '../service/session.js'
import { upload } from '../utils/multer.js'

const routerSession = express.Router()

routerSession.get('/user', (req,  res) => res.send({ data: req.user || null }))

routerSession.post('/createUser', 
upload.single('image'), // name of the input
// passport.authenticate('createUser'), 
(req, res) => {
  res.send({data: 'llego'})
  // newUserWasCreated(req, res)
})



routerSession.post('/validateLogin', passport.authenticate('validateLogin'), (req, res) => res.send({ data: { validate: true }}))
routerSession.get('/logout', (req, res) => logout(req, res))

export default routerSession