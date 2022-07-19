import express from 'express'
import passport, {logout} from '../service/session'

const router = express.Router()

router.get('/user', (req: any, res) => res.send({ data: req.user || null }))
router.post('/createUser', passport.authenticate('createUser'), (_, res) => res.send({ data: { userLogin: true } }))
router.post('/validateLogin', passport.authenticate('validateLogin'), (_, res) => res.send({ data: { validate: true } }))
router.get('/logout', (req, res) => logout(req, res))


const routerSession = router

export default routerSession