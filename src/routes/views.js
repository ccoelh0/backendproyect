import express from 'express'
const { Router } = express;
const router = new Router();

router.get('/items', (req, res) => res.sendFile('public/items.html', {root: '.'}))
router.get('/cart', (req, res) => res.sendFile('public/cart.html', {root: '.'}))

export {router}