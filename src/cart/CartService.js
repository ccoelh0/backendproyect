import CartFactory from "./CartFactory.js";
import { transporter, emailOptionsConfirmPurchase } from "../utils/contact.js";
import CartDTO from "./CartDto.js";
import config from "../config.js";
import ItemService from "../item/ItemService.js";
import OrderService from "../order/OrderService.js";

class CartService {
  constructor() {
    this.cart = CartFactory.create(config.db.persistence);
    this.item = new ItemService();
    this.transporter = transporter;
    this.cartDTO = CartDTO;
    this.time = new Date();
    this.order = new OrderService();
  }

  createNewCart = async (username) => {
    if (username === undefined)
      return { err: "email is undefined", status: 400 };

    const newCart = {
      username: username,
      timestamp: `${this.time.getDate()}/${
        this.time.getMonth() + 1
      }/${this.time.getFullYear()}`,
      items: [],
    };

    const createCart = async () => {
      const created = await this.cart.save(newCart);
      const newCartDTO = new this.cartDTO(created);
      return { data: newCartDTO, status: 200 };
    };

    try {
      const userHasCart = await this.cart.getAll();
      if (userHasCart.length > 0) {
        const find = userHasCart.find((x) => x.username === newCart.username);
        if (find !== undefined) {
          return { data: new this.cartDTO(find), status: 200 };
        } else {
          return createCart();
        }
      }
      return createCart();
    } catch (err) {
      return err;
    }
  };

  getCart = async (id) => {
    try {
      if (id) {
        const find = await this.cart.getById(id);
        if (find === null || find.err !== undefined)
          return { err: "cart not found", status: 400 };
        const cartDTO = new this.cartDTO(find);
        return { data: cartDTO, status: 200 };
      }
      const findAll = await this.cart.getAll();
      const cartsDTO = findAll.map((x) => new this.cartDTO(x));
      return { data: cartsDTO, status: 200 };
    } catch (err) {
      return err;
    }
  };

  getItemsFromCart = async (id) => {
    try {
      const cartSelected = await this.cart.getById(id);
      if (cartSelected.err !== undefined || cartSelected === null)
        return { err: cartSelected.err || "cart not found", status: 400 };

      const itemsFromCartDTO = new this.cartDTO(cartSelected).items;
      return { data: itemsFromCartDTO, status: 200 };
    } catch (err) {
      return err;
    }
  };

  deleteCart = async (id) => {
    try {
      const response = await this.cart.deleteById(id);
      if (response === null || response.err !== undefined)
        return { err: "cart is not found", status: 400 };
      return { data: id + " cart's is deleted", status: 200 };
    } catch (err) {
      return err;
    }
  };

  addItemsToCart = async (cartId, itemId) => {
    if (cartId === undefined || itemId === undefined)
      return { err: cartId || itemId + " is undefined", status: 400 };

    const itemData = await this.item.getItem(itemId);
    let cartData = await this.cart.getById(cartId);

    if (itemData.err !== undefined || cartData.err !== undefined)
      return { err: itemData.err || cartData.err, status: 400 };

    const find = cartData.items.find(x => x.id === itemId)

    if (find) {
      const items = cartData.items.filter(x => x.id !== find.id)
      const newAmount = {id: find.id, amount: find.amount + 1}
      items.push(newAmount)
      cartData = {...cartData, items}
    } else {
      cartData.items.push({id: itemData.data.id, amount: 1});
    }

    try {
      await this.cart.updateById(cartId, { items: cartData.items });
      return { data: "item add!", status: 200 };
    } catch (err) {
      return err;
    }
  };

  deleteItemFromCart = async (cartId, itemId) => {
    if (cartId === undefined || itemId === undefined)
      return { err: cartId || itemId + "is undefined", status: 400 };

    const cartSelected = await this.cart.getById(cartId);

    if (cartSelected.items.length === 0)
      return { data: "item is not in cart", status: 400 };

    const filterCart = cartSelected.items.filter((x) => x !== itemId);

    try {
      await this.cart.updateById(cartId, { items: filterCart });
      return { data: "deleted!", status: 200 };
    } catch (err) {
      return err;
    }
  };

  getUserPhone = async (email) => {
    const data = await session.getAll();
    const res = await data;
    return res.find((dato) => dato.email === email).phone;
  };

  buyCart = async (idCart) => {
    if (idCart === undefined)
      return { err: "cart id is undefined", status: 400 };

    const cart = await this.getCart(idCart);

    if (cart.err) return { err: "cart is not found! " + cart.err, status: 400 };
    if (cart.data.items.length === 0)
      return { err: "cart is empty!", status: 400 };

    try {
      await this.order.generateOrder(cart.data);
      await this.transporter.sendMail(
        emailOptionsConfirmPurchase(cart.data.username, cart.data.items)
      );
      await this.cart.updateById(idCart, { items: [] });
      return { data: "purchase finished!", status: 200 };
    } catch (err) {
      return { err: "purchase not finished", err, status: 500 };
    }
  };
}

export default CartService;
