import express from 'express'
import passport from '../service/session'

const router = express.Router()

router.post('/createUser', passport.authenticate('createUser'), (_, res) => res.send({data: {userLogin: true}}))
router.post('/validateLogin', passport.authenticate('validateLogin'), (req, res) => res.send({data: {validate: true}}))

const routerSession = router

export default routerSession