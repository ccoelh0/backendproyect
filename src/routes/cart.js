const express = require('express');
const { Router } = express;
const router = new Router();
const methods = require('../api/item')

router.post('/', (req, res) => methods.createNewCart(res))

router.delete('/:id', (req, res) => methods.deleteCart(res, req.params.id))

router.get('/:id/productos', (req, res) => methods.getItemsFromCart(req.params.id, res))

router.post('/:id/productos/:idProducto', (req, res) => methods.addItemsToCart(req, res))

router.delete('/:id/productos/:idProducto', (req, res) => methods.deleteItemFromCart(req, res))

module.exports = router;