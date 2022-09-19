class ItemDTO {
  constructor (data) {
    this.name = data.name
    this.id = data._id.valueOf()
    this.price = data.price
    this.image = data.image
    this.stock = data.stock
  }
}

export default ItemDTO