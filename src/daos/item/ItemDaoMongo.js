import Container from '../../containers/ContenedorMongo.js'
import { itemSchema } from '../../models/ItemSchema.js'

class ItemDaoMongo extends Container {
    
    constructor () {
        super('items', itemSchema)
    }
}

export default ItemDaoMongo;