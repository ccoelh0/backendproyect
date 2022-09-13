class CartDTO {
  constructor (data) {
    this.id = data._id;
    this.email = data.email;
    this.items = data.items;
  }
}

export default CartDTO;