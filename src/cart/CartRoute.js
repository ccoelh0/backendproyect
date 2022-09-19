import express from 'express'
import { addItemsToCart, deleteItemFromCart, buyCart } from '../cart/CartService.js'
import CartController from './CartController.js';

const router = express.Router();
const controller = new CartController()

router.post('/', controller.createNewCart)
router.get('/', controller.getCart)
router.get('/:id', controller.getCart)
router.delete('/:id', controller.deleteCart)
router.get('/:id/items', controller.getItemsFromCart)
router.post('/:id/items/:idItem', addItemsToCart)
router.delete('/:id/items/:idItem', deleteItemFromCart)
router.post('/buyCart/:id', buyCart)

const routerItems = router;

export default routerItems