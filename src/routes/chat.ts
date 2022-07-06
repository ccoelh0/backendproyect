import express from 'express'
import { saveMessage, renderMessagesNorm  } from '../service/chat';

const router = express.Router();

router.get('/', (_, res) => renderMessagesNorm (res))
router.post('/', (req, res) => saveMessage(req.body, res))

export {router}