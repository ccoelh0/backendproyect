import express from 'express'
import {router as routesForItems} from './routes/items'
import {router as routesForCart} from './routes/cart'
import {router as routesForViews} from './routes/views'

const app = express();

app.use(express.json()) // midelware que transforma la req.body en json
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use('/api/items', routesForItems)
app.use('/api/cart', routesForCart)
app.use('/', routesForViews)

const port = process.env.PORT || 8090

app.listen(port, () => console.log(`>>> ✅ Server is running in localhost:${port}!`))