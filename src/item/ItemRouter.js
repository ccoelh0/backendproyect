import express from 'express'
import ItemController from './ItemController.js'
import isAdmin from '../utils/isAdmin.js'

const router = express.Router()
const controller = new ItemController()

router.get('/', controller.getItem) 
router.get('/:id', controller.getItem) 
router.post('/', isAdmin, controller.saveItem) 
router.put('/:id', isAdmin, controller.updateItem) 
router.delete('/:id', isAdmin, controller.deleteItem)

const routerItems = router

export default routerItems;