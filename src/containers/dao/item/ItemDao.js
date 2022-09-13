import Container from '../../Container.js'
import { itemSchema } from '../../../models/ItemSchema.js'

class ItemDao extends Container {
    constructor () {
        super('items', itemSchema)
    }
}

export default ItemDao;