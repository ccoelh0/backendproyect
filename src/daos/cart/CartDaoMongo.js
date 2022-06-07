import Container from '../../containers/ContenedorMongo.js'
import { cartSchema } from '../../models/CartSchema.js'

class CartDaoMongo extends Container {
    
    constructor () {
        super('cart', cartSchema)
    }
}

export default CartDaoMongo;