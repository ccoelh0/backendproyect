import CartDao from "./CartDao.js"

class CartFactory {
  static create (persitence) {
    switch (persitence) {
      case 'MONGO':
        return CartDao.getInstance()
      default: 
        throw new Error('Error in persistence cart factory')
    }
  }
}

export default CartFactory;