import ItemDao from "./ItemDao.js"

class ItemFactory {
  static create (persitence) {
    switch (persitence) {
      case 'MONGO':
        return ItemDao.getInstance()
      default: 
        throw new Error('Error in persistence item factory')
    }
  }
}

export default ItemFactory