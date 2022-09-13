class ItemDTO {
  constructor (data) {
    this.name = data.name
    this.id = data._id
    this.price = data.price
    this.image = data.image
    this.description = data.description
    this.stock = data.stock
  }
}

export default ItemDTO