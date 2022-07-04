import ItemDaoMongo from './item/ItemDaoMongo'
import CartDaoMongo from './cart/CartDaoMongo'
import ChatDaoMongo from './chat/ChatDaoMongo'
import ItemDaoFirebase from './item/ItemDaoFirebase'
import CartDaoFirebase from './cart/CartDaoFirebase'

let item, cart, chat
let database = 'mongodb'

if (database === 'mongodb') {
    item = new ItemDaoMongo()
    cart = new CartDaoMongo()
    chat = new ChatDaoMongo()
} 

if (database === 'firebase') {
    item = new ItemDaoFirebase()
    cart = new CartDaoFirebase()
}

export { item, cart, chat }