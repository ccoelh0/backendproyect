import express from 'express'
import { getItem, saveItem, updateItem, deleteItem } from '../item/ItemService.js'
import { isAdmin } from '../utils/isAdmin.js'

const router = express.Router()

router.get('/', getItem)
router.get('/:id', getItem)
router.post('/', isAdmin, saveItem)
router.put('/:id', isAdmin, updateItem)
router.delete('/:id', isAdmin, deleteItem)

const routerItems = router

export default routerItems;