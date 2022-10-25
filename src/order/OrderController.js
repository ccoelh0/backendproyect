import OrderService from "./OrderService.js"

class OrderController {
  constructor() {
    this.orderService = new OrderService()
  }
}

export default OrderController