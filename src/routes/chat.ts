import express from 'express'
import { saveMessage } from '../service/chat';

const router = express.Router();

router.post('/', (req, res) => saveMessage(req.body, res))

export {router}