import ItemDaoMongo from './item/ItemDaoMongo'
import CartDaoMongo from './cart/CartDaoMongo'
import ChatDaoMongo from './chat/ChatDaoMongo'
import SessionDao from './Session/SessionDao'

let item, cart, chat, session
let database = 'mongodb'

if (database === 'mongodb') {
    item = new ItemDaoMongo()
    cart = new CartDaoMongo()
    chat = new ChatDaoMongo()
    session = new SessionDao()
} 


export { item, cart, chat, session }