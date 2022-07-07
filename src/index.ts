import express from 'express'
import {router as routesForItems} from './routes/items'
import {router as routesForCart} from './routes/cart'
import {router as routesForViews} from './routes/views'
import {router as routerFakeItem} from './routes/product-test'
import {router as routerChat} from './routes/chat'

const app = express();

app.use(express.json()) 
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use('/api/items', routesForItems)
app.use('/api/cart', routesForCart)
app.use('/api/item-test', routerFakeItem)
app.use('/api/chat', routerChat)
app.use('/', routesForViews)

const port = process.env.PORT || 8090

app.listen(port, () => console.log(`>>> ✅ Server is running in localhost:${port}!`))