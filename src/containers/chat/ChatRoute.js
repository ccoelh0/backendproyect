import express from 'express'
import { saveMessage, renderMessagesNorm } from './ChatService.js';

const router = express.Router();

router.get('/', renderMessagesNorm)
router.post('/', saveMessage)

const routerChat = router

export default routerChat