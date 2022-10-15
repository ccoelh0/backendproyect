import CartFactory from "./CartFactory.js";
import { transporter, emailOptionsConfirmPurchase } from "../utils/contact.js";
import logger from "../utils/logger.js";
import CartDTO from "./CartDTO.js";
import config from "../utils/config.js";
import ItemService from "../item/ItemService.js";

class CartService {
  constructor() {
    this.cart = CartFactory.create(config.mongobd.persistence);
    this.item = new ItemService();
    this.transporter = transporter;
  }

  createNewCart = async (newCart) => {
    const createCart = async () => {
      const created = await this.cart.save(newCart);
      const newCartDTO = new CartDTO(created);
      return { data: newCartDTO, status: 200 };
    };

    try {
      const userHasCart = await this.cart.getAll();
      if (userHasCart.length > 0) {
        const find = userHasCart.find((x) => x.email === newCart.email);
        if (find !== undefined) {
          return { data: new CartDTO(find), status: 200 };
        } else {
          return createCart();
        }
      }
      return createCart();
    } catch (err) {
      return { err, status: 404 };
    }
  };

  getCart = async (id) => {
    try {
      if (id) {
        const data = await this.cart.getById(id);
        const cartDTO = new CartDTO(data);
        return { data: cartDTO, status: 200 };
      }
      const data = await this.cart.getAll();
      const cartsDTO = data.map((x) => new CartDTO(x));
      return { data: cartsDTO, status: 200 };
    } catch (err) {
      return { err, status: 404 };
    }
  };

  getItemsFromCart = async (id) => {
    try {
      const cartSelected = await this.cart.getById(id);
      if (cartSelected.err !== undefined)
        return { err: cartSelected.err, status: 404 };

      const itemsFromCartDTO = new CartDTO(cartSelected).items;
      return { data: itemsFromCartDTO, status: 200 };
    } catch (err) {
      return { err, status: 400 };
    }
  };

  deleteCart = async (id) => {
    try {
      const response = await this.cart.deleteById(id);
      if (deleteCart === null) return { err: "cart is not found", status: 404 };
      return { data: response._doc.email + " cart's is deleted", status: 200 };
    } catch (err) {
      return { err: "cart is not found or something happens", status: 404 };
    }
  };

  addItemsToCart = async (cartId, itemId) => {
    const itemData = await this.item.getItem(itemId);

    const cartData = await this.cart.getById(cartId);

    if (itemData.err !== undefined || cartData.err !== undefined)
      return { err: itemData.err || cartData.err, status: 404 };

    cartData.items.push(itemData.id);

    try {
      await this.cart.updateById(cartId, { items: cartData.items });
      return { data: "item add!", status: 200 };
    } catch (err) {
      return { err };
    }
  };

  deleteItemFromCart = async (cartId, itemId) => {
    const cartSelected = await this.cart.getById(cartId);

    if (cartSelected.items.length === 0)
      return { data: "item is not in cart", status: 404 };

    const filterCart = cartSelected.items.filter((x) => x !== itemId);

    try {
      await this.cart.updateById(cartId, { items: filterCart });
      return { data: "deleted!", status: 200 };
    } catch (err) {
      return { err };
    }
  };

  getUserPhone = async (email) => {
    const data = await session.getAll();
    const res = await data;
    return res.find((dato) => dato.email === email).phone;
  };

  buyCart = async (idCart) => {
    const cart = await this.cart.getById(idCart);

    if (cart === null) return { err: "cart is null!", status: 404 };
    if (cart.err) return { err: cart.err, status: 404 };
    if (cart.items.length === 0) return { err: "cart is empty!", status: 404 };

    try {
      await this.transporter.sendMail(emailOptionsConfirmPurchase(cart));
      await this.cart.deleteById(idCart);
      return { data: "purchase finished!", status: 200 };
    } catch (err) {
      return { err: "purchase not finished", err, status: 500 };
    }
  };
}

export default CartService;
