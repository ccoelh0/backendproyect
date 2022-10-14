import CartService from "./CartService.js";
import ItemController from "../item/ItemController.js";

class CartController {
  constructor() {
    this.cartService = new CartService();
    this.time = new Date();
    this.itemController = new ItemController();
  }

  createNewCart = async (req, res) => {
    const newCart = {
      email: req.body.email,
      timestamp: `${this.time.getDate()}/${
        this.time.getMonth() + 1
      }/${this.time.getFullYear()}`,
      items: [],
    };

    try {
      const cart = await this.cartService.createNewCart(newCart);
      return res.send(cart);
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  getCart = async (req, res) => {
    try {
      const cart = await this.cartService.getCart(req.params.id);
      if (cart.err !== undefined)
        return res.status(404).send({ err: "cart not found" });
      return res.send(cart);
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  getItemsFromCart = async (req, res) => {
    try {
      const items = await this.cartService.getItemsFromCart(req.params.id);
      if (items.err !== undefined) return res.status(404).send(items.err);
      return res.send(items);
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  deleteCart = async (req, res) => {
    try {
      const deleteCart = await this.cartService.deleteCart(req.params.id);
    } catch (err) {
      return res.status(400).send({ err });
    }
  };

  deleteItemFromCart = async (req, res) => {
    const cartId = req.params.id;
    const itemId = req.params.idItem;

    if (cartId === undefined || itemId === undefined)
      return res.status(400).send({ err: cartId || itemId + "is undefined" });

    try {
      return await this.cartService.deleteItemFromCart(cartId, itemId);
    } catch (err) {
      return res.status(404).send({ err });
    }
  };

  addItemsToCart = async (req, res) => {
    const cartId = req.params.id;
    const itemId = req.params.idItem;

    if (cartId === undefined || itemId === undefined)
      return res.status(400).send({ err: cartId || itemId + " is undefined" });

    try {
      const items = await this.cartService.addItemsToCart(cartId, itemId);
      if (items.err) return res.status(400).send(items)
      return res.send(items);
    } catch (err) {
      return res.status(400).send(err)
    }
  };

  buyCart = async (req, res) => {
    const cart = req.body.cart;
    try {
      return this.cartService.buyCart(cart);
    } catch (err) {
      throw new Error(err);
    }
  };
}

export default CartController;
