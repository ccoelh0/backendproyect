import Container from '../../Container.js'
import { itemSchema } from '../../../models/ItemSchema.js'

class ItemDaoMongo extends Container {
    constructor () {
        super('items', itemSchema)
    }
}

export default ItemDaoMongo;