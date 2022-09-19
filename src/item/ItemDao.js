import Container from '../containers/Container.js'
import { itemSchema } from './ItemSchema.js'

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