import express from 'express'
import { getSessions, createUser, validateSession } from '../service/session'

const router = express.Router()

router.get('/', (_, res) => getSessions(res))
router.post('/createUser', (req, res) => createUser(req, res))
router.get('/login', (req, res) => validateSession(req, res))

const routerSession = router

export default routerSession