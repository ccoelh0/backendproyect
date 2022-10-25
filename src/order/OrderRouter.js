import express from 'express'
import OrderController from './OrderController.js'

const router = express.Router()
const controller = new OrderController()

router.post('/', controller.generateOrder) 

const routerOrder = router

export default routerOrder;