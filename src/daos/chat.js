const Chat = require('../Class/Chat')
const {knexSQLite} = require('../DB/databases')
const chat = new Chat(knexSQLite, 'messages')
const time = new Date()

const getForm = (res, url) => {
   return res.sendFile(url, {root: "."})
}

const saveMsjByChat = (req, res) => {
   const message = {
      email: req.body.email, 
      time: `${time.getDay()}/${time.getMonth()}/${time.getFullYear()}`,
      message: req.body.message
   }
   chat.save(message).then(() => res.json({data: "msj enviado"}))
}

const getAll = (req, res) => {
   chat.getAll().then(response => res.json({data: response})).catch(err => console.log(err))
}

module.exports = {getForm, saveMsjByChat, getAll}