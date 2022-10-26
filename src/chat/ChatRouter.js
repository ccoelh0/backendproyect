import express from 'express'
import isAdmin from '../utils/isAdmin.js';
import ChatController from './ChatController.js';

const router = express.Router();
const controller = new ChatController()
export const initialize = (io) => controller.initialize(io)

router.get('/', controller.getAllMessages)
router.get('/:email', controller.getMessagesByEmail)
router.post('/', controller.saveMessage)
router.post('/:idChat', isAdmin, controller.saveResponse)

const routerChat = router

export default routerChat