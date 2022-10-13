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
import ItemService from '../item/ItemService.js'

class CartService {
  constructor() {
    this.cart = CartFactory.create(config.mongobd.persistence);
    this.item = new ItemService();
  }

  createNewCart = async (newCart, res) => {
    try {
      const created = await this.cart.save(newCart);
      const newCartDTO = new CartDTO(created);
      return res.json({ data: newCartDTO });
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  getCart = async (id, res) => {
    try {
      if (id) {
        const data = await this.cart.getById(id);
        const cartDTO = new CartDTO(data);
        return res.json({ data: cartDTO });
      }
      const data = await this.cart.getAll();
      const cartsDTO = data.map((x) => new CartDTO(x));
      return res.json({ data: cartsDTO });
    } catch (err) {
      return res.status(400).send({ err });
    }
  };

  getItemsFromCart = async (id, res) => {
    try {
      const cartSelected = await this.cart.getById(id);
      const itemsFromCartDTO = new CartDTO(cartSelected).items;
      return res.json({ data: itemsFromCartDTO });
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  deleteCart = async (id, res) => {
    try {
      const response = await this.cart.deleteById(id);
      return res.send({ data: response._doc.email + " cart's is deleted" });
    } catch (err) {
      return res
        .status(404)
        .send({ err: "cart is not found or something happens" });
    }
  };

  addItemsToCart = async (cartId, itemId, res) => {
    const itemData = await this.item.getItem(itemId);
    const cartData = await this.cart.getById(cartId);
    cartData.items.push(itemData);

    try {
      await this.cart.updateById(cartId, { items: cartData.items });
      return res.json({ data: 'item add!' });
    } catch (err) {
      return res.status(400).send({ err });
    }
  };

  deleteItemFromCart = async (cartId, itemId, res) => {
    const cartSelected = await this.cart.getById(cartId);
    const filter = cartSelected.items.filter((x) => x._id.valueOf() !== itemId);

    try {
      await this.cart.updateById(cartId, { items: filter });
      return res.json({ data: `${itemId} eliminado` });
    } catch (err) {
      return res.status(400).send({ err });
    }
  };

  getUserPhone = async (email) => {
    const data = await session.getAll();
    const res = await data;
    return res.find((dato) => dato.email === email).phone;
  };

  buyCart = async (cart, res) => {
    const phoneBuyer = await getUserPhone(this.cart.email);
    try {
      await transporter.sendMail(emailOptionsConfirmPurchase(cart));
      await sendWp(cart);
      await sendMsg(cart, phoneBuyer);
      return res.send({ purchaseFinished: true });
    } catch (err) {
      logger.error(err);
      return res.send({ purchaseFinished: false, err });
    }
  };
}

export default CartService;
