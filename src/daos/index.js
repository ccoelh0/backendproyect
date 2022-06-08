let item
let cart
let db = 'mongodb'

if (db === 'mongodb') {
    const { default: Item } = await import('./item/ItemDaoMongo.js')
    const { default: Cart } = await import('./cart/CartDaoMongo.js')
    item = new Item()
    cart = new Cart()
} 

export { item, cart }