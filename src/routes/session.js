import express from 'express'
import passport, {logout} from '../service/session.js'

const routerSession = express.Router()

routerSession.get('/user', (req,  res) => res.send({ data: req.user || null }))
routerSession.post('/createUser', passport.authenticate('createUser'), (_, res) => res.send({ data: { userLogin: true } }))
routerSession.post('/validateLogin', passport.authenticate('validateLogin'), (_, res) => res.send({ data: { validate: true } }))
routerSession.get('/logout', (req, res) => logout(req, res))

export default routerSession