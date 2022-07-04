import express from 'express'
const router = express.Router();

// router.get('/items', (req, res) => res.sendFile('public/items.html', {root: '.'}))
// router.get('/cart', (req, res) => res.sendFile('public/cart.html', {root: '.'}))
router.get('/item-test', (_, res) => res.sendFile('public/itemTest.html', {root: '.'}))
router.get('/chat', (_, res) => res.sendFile('public/chat.html', {root: '.'}))

export {router}