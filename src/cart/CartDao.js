import Container from '../containers/Container.js'
import { cartSchema } from './CartSchema.js'

let instance = null

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