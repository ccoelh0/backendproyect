import express from 'express'
import http from 'http'
import { Server } from 'socket.io';
import { getAllMessage } from './service/chat'
import routesForItems from './routes/items'
import routesForCart from './routes/cart'
import routesForViews from './routes/views'
import routerChat from './routes/chat'
import routerSession from './routes/session';
import coockieParser from 'cookie-parser'
import session from 'express-session'
import passport from './service/session';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(coockieParser())

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  maxAge: 60000
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes 
app.use('/api/sessions', routerSession)
app.use('/api/items', routesForItems)
app.use('/api/cart', routesForCart)
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