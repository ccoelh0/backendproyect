// const Chat = require('./Class/Chat');
// let chat = new Chat();
// let messages = require('../messages.json')

const stock = require('../../stock.json')

const methodsSocket = socket => {
    socket.emit('be-connection', stock)
}

module.exports = {methodsSocket}