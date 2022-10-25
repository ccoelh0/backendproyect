import OrderDao from "./OrderDao.js"

class OrderFactory {
  static create (persitence) {
    switch (persitence) {
      case 'MONGO':
        return OrderDao.getInstance()
      default: 
        throw new Error('Error in persistence order factory')
    }
  }
}

export default OrderFactory