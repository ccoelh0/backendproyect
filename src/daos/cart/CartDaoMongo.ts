import Container from '../../containers/ContainerMongo'
import { cartSchema } from '../../models/CartSchema'

class CartDaoMongo extends Container {
    constructor () {
        super('cart', cartSchema)
    }
}

export default CartDaoMongo;