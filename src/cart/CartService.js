import CartFactory from "./CartFactory.js";
import {
  transporter,
  emailOptionsConfirmPurchase,
  sendWp,
  sendMsg,
} from "../utils/contact.js";
import logger from "../utils/logger.js";
import CartDTO from "./CartDTO.js";
import config from "../utils/config.js";
import ItemController from "../item/ItemController.js";
import ItemService from "../item/ItemService.js";

class CartService {
  constructor() {
    this.cart = CartFactory.create(config.mongobd.persistence);
    this.item = new ItemService();
  }

  createNewCart = async (newCart) => {
    const createCart = async () => {
      const created = await this.cart.save(newCart);
      const newCartDTO = new CartDTO(created);
      return { data: newCartDTO };
    };

    try {
      const userHasCart = await this.cart.getAll();
      if (userHasCart.length > 0) {
        const find = userHasCart.find((x) => x.email === newCart.email);
        if (find !== undefined) {
          return { data: new CartDTO(find) };
        } else {
          return createCart();
        }
      }
      return createCart();
    } catch (err) {
      return {err};
    }
  };

  getCart = async (id) => {
    try {
      if (id) {
        const data = await this.cart.getById(id);
        const cartDTO = new CartDTO(data);
        return { data: cartDTO };
      }
      const data = await this.cart.getAll();
      const cartsDTO = data.map((x) => new CartDTO(x));
      return { data: cartsDTO };
    } catch (err) {
      return { err };
    }
  };

  getItemsFromCart = async (id) => {
    try {
      const cartSelected = await this.cart.getById(id);
      if (cartSelected.err !== undefined)
        return { err: cartSelected.err }
      const itemsFromCartDTO = new CartDTO(cartSelected).items;
      return {data: itemsFromCartDTO };
    } catch (err) {
      return {err};
    }
  };

  deleteCart = async (id) => {
    try {
      const response = await this.cart.deleteById(id);
      console.log(response)
      return { data: response._doc.email + " cart's is deleted" };
    } catch (err) {
      return { err: "cart is not found or something happens" };
    }
  };

  addItemsToCart = async (cartId, itemId) => {
    const itemData = await this.item.getItem(itemId);
    const cartData = await this.cart.getById(cartId);

    if (itemData.err !== undefined || cartData.err !== undefined)
      return {err: itemData.err || cartData.err};

    cartData.items.push(itemData);

    try {
      await this.cart.updateById(cartId, { items: cartData.items });
      return { data: "item add!" };
    } catch (err) {
      return { err };
    }
  };

  deleteItemFromCart = async (cartId, itemId) => {
    const cartSelected = await this.cart.getById(cartId);

    const filter = cartSelected.items.filter((x) => x._id.valueOf() !== itemId);

    console.log(filter)

    try {
      await this.cart.updateById(cartId, { items: filter });
      return { data: `${itemId} eliminado` };
    } catch (err) {
      return { err };
    }
  };

  getUserPhone = async (email) => {
    const data = await session.getAll();
    const res = await data;
    return res.find((dato) => dato.email === email).phone;
  };

  buyCart = async (cart) => {
    const phoneBuyer = await getUserPhone(this.cart.email);
    try {
      await transporter.sendMail(emailOptionsConfirmPurchase(cart));
      await sendWp(cart);
      await sendMsg(cart, phoneBuyer);
      return { purchaseFinished: true };
    } catch (err) {
      logger.error(err);
      return { purchaseFinished: false, err };
    }
  };
}

export default CartService;
