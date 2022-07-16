import express from 'express'
const router = express.Router();

const root = {root: '.'}

// router.get('/items', (req, res) => res.sendFile('public/items.html', {root: '.'}))
// router.get('/cart', (req, res) => res.sendFile('public/cart.html', {root: '.'}))
router.get('/item', (_, res) => res.sendFile('/public/itemTest.html', root))
router.get('/chat', (_, res) => res.sendFile('/public/chat.html', root))
router.get('/login', (_, res) => res.sendFile('/public/login.html', root))
router.get('/index', (_, res) => res.sendFile('/public/index.html', root))

const routerViews = router

export default routerViews