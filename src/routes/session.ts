import express from 'express'
import { passport } from '../service/session'

const router = express.Router()

router.post('/login', passport.authenticate('login'), (_, res) => res.send({data: {userLogin: true}}))

const routerSession = router

export default routerSession