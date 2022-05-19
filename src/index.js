const express = require('express');
const app = express();

//--------------------------------------------

// SOCKET 
const http = require('http')
const server = http.createServer(app)

const { Server } = require('socket.io');
const io = new Server(server);

const methodsSocket = require('./websockets/websockets')

io.on('connection', (socket) => {
    methodsSocket.sendStock(socket)
    socket.on('fe-connection', (data) => console.log(data))
});

//--------------------------------------------

// ROUTES
const routesItem = require('./routes/items');
const routesCart = require('./routes/cart');
const routesChat = require('./routes/chat')

//--------------------------------------------

// MILDWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(express.static(path.join(__dirname + '/public')))
app.use(express.static('public'))
app.use('/api/items', routesItem)
app.use('/api/cart', routesCart)
app.use('/api/chat', routesChat)

//--------------------------------------------

const port = process.env.PORT || 8090

server.listen(port, () => console.log(`>>> ✅ Server is running in localhost:${port}!`))