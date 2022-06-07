import express from 'express'
import {router as routerItem} from './routes/items.js'
import {router as routerCart} from './routes/cart.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use('/api/items', routerItem)
app.use('/api/cart', routerCart)

const port = process.env.PORT || 8090

app.listen(port, () => console.log(`>>> ✅ Server is running in localhost:${port}!`))