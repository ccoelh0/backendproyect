import express from 'express'
const app = express();
import {router as routerItem} from './routes/items.js'

//--------------------------------------------

// MILDWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use('/api/items', routerItem)
// app.use('/api/cart', routesCart)

//--------------------------------------------

const port = process.env.PORT || 8090

app.listen(port, () => console.log(`>>> ✅ Server is running in localhost:${port}!`))