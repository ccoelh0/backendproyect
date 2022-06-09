let item
let cart
let db = 'mongodb'

if (db === 'mongodb') {
    const { default: Item } = await import('./item/ItemDaoMongo.js')
    const { default: Cart } = await import('./cart/CartDaoMongo.js')
    item = new Item()
    cart = new Cart()
} 

if (db === 'firebase') {
    const { default: Item } = await import('./item/ItemDaoFirebase.js')
    const { default: Cart } = await import('./cart/CartDaoFirebase.js')
    item = new Item()
    cart = new Cart()
}

export { item, cart }