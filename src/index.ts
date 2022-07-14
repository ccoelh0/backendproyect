import express from 'express'
import http from 'http'
import { Server } from 'socket.io';
import { getAllMessage } from './service/chat'
import coockieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo';
import configs from './utils/config'
import { router as routesForItems } from './routes/items'
import { router as routesForCart } from './routes/cart'
import { router as routesForViews } from './routes/views'
import { router as routerFakeItem } from './routes/product-test'
import { router as routerChat } from './routes/chat'

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

app.use(coockieParser())

// Session setup
app.use(session({
  store: MongoStore.create({
    mongoUrl: configs.mongobd.connectionAtlas,
    collectionName: 'userLogin'
  }),
  secret: 'secret',
  resave: true,
  cookie: {
    maxAge: 60000
  },
  saveUninitialized: true
}))

app.get('/user', (req: any, res) => {
  if (req.session.name) return res.send({data: {username: req.session.name}})
  return res.send({data: {redirect: '/login'}})
})

app.post('/login', (req: any, res) => {
  if (!req.session.name) {
    req.session.name = req.body.name
    return res.send({data: '/index'})
  } else {
    return res.send({data: '/index'})
  }
})

app.get('/logout', (req: any, res: any) => req.session.destroy(() => res.send({data: '/login'})))

const port = process.env.PORT || 8090

server.listen(port, () => console.log(`>>> ✅ Server is running in localhost:${port}!`))