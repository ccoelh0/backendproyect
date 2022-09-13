import Container from '../../Container.js'
import { cartSchema } from '../../../models/CartSchema.js'

class CartDao extends Container {
    constructor () {
        super('cart', cartSchema)
    }
}

export default CartDao;