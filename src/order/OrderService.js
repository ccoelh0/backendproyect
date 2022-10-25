import OrderFactory from "./OrderFactory.js";
import config from "../config.js";
import OrderDTO from "./OrderDto.js";

class OrderService {
  constructor() {
    this.order = OrderFactory.create(config.db.persistence);
    this.time = new Date();
    this.orderDTO = OrderDTO;
  }

  generateOrder = async (cart) => {
    try {
      const ordersQuantity = await this.order.getAll();

      if (ordersQuantity.err || ordersQuantity === null)
        return { err: "something happens", status: 500 };
      if (
        cart.items === undefined ||
        cart.items.length === 0 ||
        cart.username === undefined
      )
        return { err: "bad request in cart", status: 400 };

      const order = {
        items: cart.items,
        timestamp: `${this.time.getDate()}/${
          this.time.getMonth() + 1
        }/${this.time.getFullYear()}`,
        orderNumber: ordersQuantity + 1,
        state: "Generada",
        username: cart.username,
      };

      const response = await this.order.save(order);

      if (response.err) return { err: response.err, status: 500 };
      return { data: new OrderDTO(response), status: 200 };
    } catch (err) {
      return err;
    }
  };
}

export default OrderService;
