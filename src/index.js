const express = require('express');
const app = express();

//--------------------------------------------

// Desafio
const Chat = require('./Class/Chat')
const Item = require('./Class/Item')
const http = require('http')
const server = http.createServer(app)

const { Server } = require('socket.io');
const io = new Server(server);

const {knexSQLite, knex} = require('./DB/databases')
const chat = new Chat(knexSQLite, 'messages')
const item = new Item(knex, 'items')

io.on('connection', (socket) => {
    chat.getAll().then(response => socket.emit('data-chat', response))
    socket.on('submit-chat', data => {
        chat.save(data).then(()=> console.log('success')).catch(err => console.log(err))
        chat.getAll().then(response => {
            socket.emit('data-chat', response)
        })
    })

    item.getAll().then(response => socket.emit('data-items', response)).catch(err => console.log(err))
    socket.on('submit-item', data => {
        const time = new Date()
        const obj = {...data, timestamp: `${time.getDay()}/${time.getMonth()}/${time.getFullYear()}`}
        item.save(obj)
            .then(() => {
                item.getAll()
                    .then(response => socket.emit('data-items', response))
                    .catch(err => console.log(err))
            })   
            .catch(err => console.log(err))
    })

});

//--------------------------------------------

// ROUTES
const routesItem = require('./routes/items');
// const routesCart = require('./routes/cart');
const routesChat = require('./routes/chat')

//--------------------------------------------

// MILDWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use('/api/items', routesItem)
// app.use('/api/cart', routesCart)
app.use('/api/chat', routesChat)

//--------------------------------------------

const port = process.env.PORT || 8090

server.listen(port, () => console.log(`>>> ✅ Server is running in localhost:${port}!`))