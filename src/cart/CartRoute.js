import express from 'express'
import CartController from './CartController.js';

const router = express.Router();
const controller = new CartController()

router.post('/', controller.createNewCart)
router.get('/', controller.getCart)
router.get('/:id', controller.getCart)
router.delete('/:id', controller.deleteCart)
router.get('/:id/items', controller.getItemsFromCart)
router.post('/:id/items/:idItem', controller.addItemsToCart)
router.delete('/:id/items/:idItem', controller.deleteItemFromCart)
router.post('/buyCart/:id', controller.buyCart)

const routerCart = router;

export default routerCart