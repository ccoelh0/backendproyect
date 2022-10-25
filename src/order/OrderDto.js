class OrderDTO {
  constructor (data) {
    this.username = data.username
    this.orderNumber = data.orderNumber
    this.items = data.items
  }
}

export default OrderDTO