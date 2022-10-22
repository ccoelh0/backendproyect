import express from 'express'
const router = express.Router();

const root = {root: '.'}

router.get('/login', (_, res) => res.sendFile('/public/login.html', root))

const routerViews = router

export default routerViews