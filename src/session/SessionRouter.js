import express from 'express'
import passport, {logout, newUserWasCreated, getUser, validateLogin} from './SessionService.js'
import { upload } from '../utils/multer.js'

const routerSession = express.Router()

routerSession.get('/user', getUser)
routerSession.post('/createUser', upload.single('avatar'), passport.authenticate('createUser'), newUserWasCreated)
routerSession.post('/validateLogin', passport.authenticate('validateLogin'), validateLogin)
routerSession.get('/logout', logout)

export default routerSession