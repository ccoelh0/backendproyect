import express from 'express'
import {createNewCart, deleteCart, getCart, getItemsFromCart, addItemsToCart, deleteItemFromCart, buyCart} from '../service/cart.js'

const router = express.Router();

router.post('/', createNewCart)
router.get('/', getCart)
router.get('/:id', getCart)
router.delete('/:id', (req, res) => deleteCart(res, req.params.id))
router.get('/:id/items', (req, res) => getItemsFromCart(req.params.id, res))
router.post('/:id/items/:idItem', (req, res) => addItemsToCart(req, res))
router.delete('/:id/items/:idItem', (req, res) => deleteItemFromCart(req, res))
router.post('/buyCart/:id', (req, res) => buyCart(req, res))

const routerItems = router;

export default routerItems