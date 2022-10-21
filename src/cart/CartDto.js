class CartDTO {
  constructor (data) {
    this.id = data._id.valueOf();
    this.username = data.username;
    this.items = data.items;
  }
}

export default CartDTO;