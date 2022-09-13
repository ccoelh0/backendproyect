import Container from '../../Container.js'
import { cartSchema } from '../../../models/CartSchema.js'

class CartDaoMongo extends Container {
    constructor () {
        super('cart', cartSchema)
    }
}

export default CartDaoMongo;