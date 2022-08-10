import 'dotenv/config'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io';
// import { getAllMessage } from './service/chat'
// import routesForItems from './routes/items'
// import routesForCart from './routes/cart'
// import routesForViews from './routes/views'
// import routerChat from './routes/chat'
// import routerSession from './routes/session';
import {router} from './routes/product-test.js'
import coockieParser from 'cookie-parser'
import session from 'express-session'
// import passport from './service/session';
import cluster from 'cluster';
import os from 'os'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(express.static('public')) // se debe comentar por nginx
app.use(coockieParser())

app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: true,
  maxAge: 60000
}));

// app.use(passport.initialize());
// app.use(passport.session());

// Routes 
// app.use('/api/sessions', routerSession)
// app.use('/api/items', routesForItems)
// app.use('/api/cart', routesForCart)
// app.use('/api/chat', routerChat)
// app.use('/', routesForViews)
// app.use('/', routerDesafioFork)
app.use('api/randoms', router)

const server = http.createServer(app)
const io = new Server(server);

io.on('connection', async (socket) => {
  const data = await getAllMessage()
  socket.emit('data-chat', data)

  socket.on('new-message', async data => {
    socket.emit('update-chat', await getAllMessage())
  })
})

const port = process.argv[2] || 8080
const processId = process.pid

app.get('/info', (_, res) => {
  res.send(`id: ${processId} - numero de procesadores: ${os.cpus().length}`)
})

if (process.argv[3] === 'cluster' && cluster.isPrimary) {
  for (let i = 0; i <= os.cpus().length; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => console.log(worker.process.pid, 'died'))
} else {
  server.listen(port, () => {
    console.log(`>>> ✅ Server is running in localhost:${port} - PID WORKER: ${process.pid}!`)
  })
}
