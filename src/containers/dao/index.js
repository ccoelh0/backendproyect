import ItemDaoMongo from './item/ItemDao.js'
import CartDaoMongo from './cart/CartDao.js'
import ChatDaoMongo from './chat/ChatDaoMongo.js'
import SessionDao from './user/SessionDao.js'

let item, cart, chat, session
let database = 'mongodb'

if (database === 'mongodb') {
    item = new ItemDaoMongo()
    cart = new CartDaoMongo()
    chat = new ChatDaoMongo()
    session = new SessionDao()
} 


export { item, cart, chat, session }