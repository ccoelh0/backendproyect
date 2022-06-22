import ItemDaoMongo from './item/ItemDaoMongo'
import CartDaoMongo from './cart/CartDaoMongo'

let item
let cart
let db = 'mongodb'

if (db === 'mongodb') {
    item = new ItemDaoMongo()
    cart = new CartDaoMongo()
} 

// if (db === 'firebase') {
//     const { default: Item } = await import('./item/ItemDaoFirebase.js')
//     const { default: Cart } = await import('./cart/CartDaoFirebase.js')
//     item = new Item()
//     cart = new Cart()
// }

export { item, cart }