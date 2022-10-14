import express from 'express'
import CartController from './CartController.js';

const router = express.Router();
const controller = new CartController()

router.post('/', controller.createNewCart) // ready
router.get('/', controller.getCart) // ready
router.get('/:id', controller.getCart) // ready
router.delete('/:id', controller.deleteCart) // ready
router.get('/:id/items', controller.getItemsFromCart) // ready
router.post('/:id/items/:idItem', controller.addItemsToCart) // ready
router.delete('/:id/items/:idItem', controller.deleteItemFromCart) // 
router.post('/buyCart/:id', controller.buyCart) //

const routerCart = router;

export default routerCart