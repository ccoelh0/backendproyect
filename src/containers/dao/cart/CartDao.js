import Container from '../../Container.js'
import { cartSchema } from '../../../models/CartSchema.js'

let instance = false

class CartDao extends Container {
    constructor () {
        super('cart', cartSchema)
    }

    static getInstance () {
        if (!instance) return instance = new CartDao()
        return instance
    }
}

export default CartDao;