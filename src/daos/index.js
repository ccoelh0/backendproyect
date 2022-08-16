import ItemDaoMongo from './item/ItemDaoMongo.js'
import CartDaoMongo from './cart/CartDaoMongo.js'
import ChatDaoMongo from './chat/ChatDaoMongo.js'
import SessionDao from './Session/SessionDao.js'

let item, cart, chat, session
let database = 'mongodb'

if (database === 'mongodb') {
    item = new ItemDaoMongo()
    cart = new CartDaoMongo()
    chat = new ChatDaoMongo()
    session = new SessionDao()
} 


export { item, cart, chat, session }