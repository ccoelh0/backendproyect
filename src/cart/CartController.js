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
      return await this.cartService.createNewCart(newCart, res);
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  getCart = async (req, res) => {
    try {
      return await this.cartService.getCart(req.params.id, res);
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  getItemsFromCart = async (req, res) => {
    try {
      return await this.cartService.getCart(req.params.id, res);
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  deleteCart = async (req, res) => {
    try {
      return await this.cartService.deleteCart(req.params.id, res)
    } catch (err) {
      return res.status(400).send({err});
    }
  };

  deleteItemFromCart = async (req, res) => {
    const cartId = req.params.id;
    const itemId = req.params.idItem;

    try {
      return await this.cartService.deleteItemFromCart(cartId, itemId, res);
    } catch (err) {
      return res.status(400).send({err});
    }
  };

  addItemsToCart = async (req, res) => {
    const cartId = req.params.id;
    const itemId = req.params.idItem;

    try {
      return await this.cartService.addItemsToCart(cartId, itemId, res);
    } catch (err) {
      console.log(err)
    }
  };

  buyCart = async (req, res) => {
    const cart = req.body.cart;
    try {
      return this.cartService.buyCart(cart, res);
    } catch (err) {
      throw new Error(err);
    }
  };
}

export default CartController;
