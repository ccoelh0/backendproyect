import express from 'express'
import {router as routesForItems} from './routes/items'
import {router as routesForCart} from './routes/cart'
import {router as routesForViews} from './routes/views'
import {router as routerFakeItem} from './routes/product-test'
import {router as routerChat} from './routes/chat'
import http from 'http'
import { Server } from 'socket.io';
import { getAllMessage } from './service/chat'
import { Socket } from 'socket.io-client'

const app = express();

app.use(express.json()) 
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use('/api/items', routesForItems)
app.use('/api/cart', routesForCart)
app.use('/api/item-test', routerFakeItem)
app.use('/api/chat', routerChat)
app.use('/', routesForViews)

const server = http.createServer(app)
const io = new Server(server);

io.on('connection', async (socket) => {
  const data = await getAllMessage()
  socket.emit('data-chat', data)

  socket.on('new-message', async data => {
    socket.emit('update-chat', await getAllMessage())
  })
})

const port = process.env.PORT || 8090

server.listen(port, () => console.log(`>>> ✅ Server is running in localhost:${port}!`))