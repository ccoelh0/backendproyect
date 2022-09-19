import express from 'express'
const router = express.Router();

const root = {root: '.'}

router.get('/chat', (_, res) => res.sendFile('/public/chat.html', root))
router.get('/login', (_, res) => res.sendFile('/public/login.html', root))
router.get('/index', (_, res) => res.sendFile('/public/index.html', root))

const routerViews = router

export default routerViews