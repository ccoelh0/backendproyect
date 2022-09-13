import express from 'express'
import { createNewCart, deleteCart, getCart, getItemsFromCart, addItemsToCart, deleteItemFromCart, buyCart } from '../service/cart.js'

const router = express.Router();

router.post('/', createNewCart)
router.get('/', getCart)
router.get('/:id', getCart)
router.delete('/:id', deleteCart)
router.get('/:id/items', getItemsFromCart)
router.post('/:id/items/:idItem', addItemsToCart)
router.delete('/:id/items/:idItem', deleteItemFromCart)
router.post('/buyCart/:id', buyCart)

const routerItems = router;

export default routerItems