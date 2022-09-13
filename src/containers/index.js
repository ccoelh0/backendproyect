import ItemDao from './item/ItemDao.js'
import CartDao from './cart/CartDao.js'
import ChatDao from './chat/ChatDao.js'
import SessionDao from './user/SessionDao.js'

let item, cart, chat, session
let database = 'mongodb'

if (database === 'mongodb') {
    item = new ItemDao()
    cart = new CartDao()
    chat = new ChatDao()
    session = new SessionDao()
} 


export { item, cart, chat, session }