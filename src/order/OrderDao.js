import Container from '../containers/ContainerMongo.js'
import orderSchema from './OrderSchema.js'

let instance = null

class OrderDao extends Container {
    constructor () {
        super('order', orderSchema)
    }

    static getInstance () {
        if (!instance) return instance = new OrderDao()
        return instance
    }
}

export default OrderDao;