const express = require('express');
const app = express();
const routes = require('./routes/items-routes');
const path = require('path');
const stock = require('./stock.json')
const methodsItemClass = require('./api/methods-items')

//--------------------------------------------

// SOCKET IO
const http = require('http')
const server = http.createServer(app)

const { Server } = require('socket.io');
const Chat = require('./ChatClass');
const io = new Server(server);

let chat = new Chat();
let messages = require('./messages.json')

io.on('connection', (socket) => {
    // Stock
    socket.emit('be-connection', stock)
    socket.on('new-item', data => {
        methodsItemClass.saveItemByWS(data);
    })

    // Chat
    socket.emit('datachat', messages)
    socket.on('msjFromChat', data => {
        chat.save(data).then(res =>
            io.sockets.emit('datachat', res)
        )
    })
});

//--------------------------------------------

// MILDWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname + '/public')))
app.use('/api', routes)

//--------------------------------------------

const port = process.env.PORT || 8090

server.listen(port, () => console.log(`server running in ${port}`))