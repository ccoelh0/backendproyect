import express from 'express'
import {createNewCart, deleteCart, getCart, getItemsFromCart, addItemsToCart, deleteItemFromCart} from '../service/cart.js'

const router = express.Router();

router.post('/', (req, res) => createNewCart(req, res))
router.get('/', (req, res) => getCart(false, res))
router.get('/:id', (req, res) => getCart(req.params.id, res))
router.delete('/:id', (req, res) => deleteCart(res, req.params.id))
router.get('/:id/items', (req, res) => getItemsFromCart(req.params.id, res))
router.post('/:id/items/:idItem', (req, res) => addItemsToCart(req, res))
router.delete('/:id/items/:idItem', (req, res) => deleteItemFromCart(req, res))

const routerItems = router;

export default routerItems