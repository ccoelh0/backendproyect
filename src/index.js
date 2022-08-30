import 'dotenv/config'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io';
import { getAllMessage } from './service/chat.js'
import coockieParser from 'cookie-parser'
import session from 'express-session'
import passport from './service/session.js';
import args from './utils/args.js';
import cluster from 'cluster';
import logger from './utils/logger.js';
import os from 'os'

//Routes
import routerSession from './routes/session.js';
import routesForViews from './routes/views.js'
import routesForItems from './routes/items.js'
import routesForCart from './routes/cart.js'
// import routerChat from './routes/chat.js'
// import routerFork from './routes/fork.js';
// import routerRandom from './routes/product-test.js'
// import routerInfo from './routes/info.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public')) // se debe comentar por nginx
app.use(coockieParser())

app.use(session({
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: true,
  resave: true,
  cookie: {maxAge:6000000}
  // value: 0
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes 
app.use('/api/sessions', routerSession)
app.use('/api/items', routesForItems)
app.use('/api/cart', routesForCart)
app.use('/', routesForViews)
// app.use('/api/chat', routerChat)
// app.use('/fork', routerFork)
// app.use('/api/random', routerRandom)
// app.use('/api', routerInfo)

app.use((_, res) => {
  logger.warn('Recurso invalido');
  res.sendStatus(404);
}) 


const server = http.createServer(app)
const io = new Server(server);

io.on('connection', async (socket) => {
  const data = await getAllMessage()
  socket.emit('data-chat', data)

  socket.on('new-message', async data => {
    socket.emit('update-chat', await getAllMessage())
  })
})

const port = args.port || process.env.PORT || 8090

if ((args.mode === 'cluster' || process.env.MODE === 'CLUSTER') && cluster.isPrimary) {
  for (let i = 0; i <= os.cpus().length; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => console.log(worker.process.pid, 'died'))
} else {
  server.listen(port, () => console.log(`>>> ✅ Server is running in localhost:${port}`))
}