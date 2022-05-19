const stock = require('../../stock.json')

const sendStock = socket => {
    socket.emit('be-connection', stock)
}

module.exports = { sendStock }