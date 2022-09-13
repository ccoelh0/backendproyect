import Container from '../../Container.js'
import { itemSchema } from '../../../models/ItemSchema.js'

let instance = null

class ItemDao extends Container {
    constructor () {
        super('items', itemSchema)
    }

    static getInstance () {
        if (!instance) return instance = new ItemDao()
        return instance
    }
}

export default ItemDao;