import express from 'express'
import isAdmin from '../utils/isAdmin.js';
import ChatController from './ChatController.js';

const router = express.Router();
const controller = new ChatController()

router.get('/', controller.getAllMessages)
router.get('/:email', controller.getMessagesByEmail)
router.post('/', controller.saveMessage)

const routerChat = router

export const initialize = (io) => controller.initialize(io)
export default routerChat