import express from 'express'
import {router as routerItem} from './routes/items.js'
import {router as routerCart} from './routes/cart.js'
import {router as routerViews} from './routes/views.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use('/api/items', routerItem)
app.use('/api/cart', routerCart)
app.use('/', routerViews)


const port = process.env.PORT || 8090

app.listen(port, () => console.log(`>>> ✅ Server is running in localhost:${port}!`))