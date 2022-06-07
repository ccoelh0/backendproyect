import express from 'express'
const { Router } = express;
const router = new Router();
import {createNewCart, deleteCart, getItemsFromCart, addItemsToCart, deleteItemFromCart} from '../api/cart.js'

router.post('/', (req, res) => createNewCart(res))

router.delete('/:id', (req, res) => deleteCart(res, req.params.id))

router.get('/:id/items', (req, res) => getItemsFromCart(req.params.id, res))

router.post('/:id/item/:idItem', (req, res) => addItemsToCart(req, res))

router.delete('/:id/productos/:idProducto', (req, res) => deleteItemFromCart(req, res))

export {router}