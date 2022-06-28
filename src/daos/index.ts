import ItemDaoMongo from './item/ItemDaoMongo'
import CartDaoMongo from './cart/CartDaoMongo'
import ItemDaoFirebase from './item/ItemDaoFirebase'
import CartDaoFirebase from './cart/CartDaoFirebase'

let item
let cart
let database = 'mongodb'

if (database === 'mongodb') {
    item = new ItemDaoMongo()
    cart = new CartDaoMongo()
} 

if (database === 'firebase') {
    item = new ItemDaoFirebase()
    cart = new CartDaoFirebase()
}

export { item, cart }