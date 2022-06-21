import Container from '../../containers/ContainerMongo'
import { itemSchema } from '../../models/ItemSchema'

class ItemDaoMongo extends Container {
    
    constructor () {
        super('items', itemSchema)
    }
}

export default ItemDaoMongo;