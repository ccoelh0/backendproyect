import CartService from "./CartService.js";
import ItemController from "../item/ItemController.js";

class CartController {
  constructor() {
    this.cartService = new CartService();
    this.time = new Date();
    this.itemController = new ItemController();
  }

  createNewCart = async (req, res) => {
    if (req.body.email === undefined)
      return res.status(400).send({ err: "email is undefined" });

    const newCart = {
      email: req.body.email,
      timestamp: `${this.time.getDate()}/${
        this.time.getMonth() + 1
      }/${this.time.getFullYear()}`,
      items: [],
    };

    try {
      const response = await this.cartService.createNewCart(newCart);
      return res.status(response.status).send(response.data);
    } catch (err) {
      return res.status(404).send(err);
    }
  };

  getCart = async (req, res) => {
    try {
      const cart = await this.cartService.getCart(req.params.id);
      if (cart.err !== undefined)
        return res.status(404).send({ err: "cart not found" });
      return res.status(cart.status).send(cart.data);
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  getItemsFromCart = async (req, res) => {
    try {
      const items = await this.cartService.getItemsFromCart(req.params.id);

      if (items.err !== undefined) return res.status(404).send(items.err);

      return res.status(items.status).send(items.data);
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  deleteCart = async (req, res) => {
    try {
      const deleteCart = await this.cartService.deleteCart(req.params.id);
      if (deleteCart.err !== undefined)
        return res.status(deleteCart.status).send(deleteCart.err);
      return res.status(deleteCart.status).send(deleteCart.data);
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
      const deleted = await this.cartService.deleteItemFromCart(cartId, itemId);
      return res.status(deleted.status).send(deleted.data);
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
      if (items.err) return res.status(items.status).send(items.err);
      return res.status(items.status).send(items.data);
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  buyCart = async (req, res) => {
    const cart = req.params.idCart;

    if (cart === undefined)
      return res.status(404).send("id cart is undefined");

    try {
      const response = await this.cartService.buyCart(cart);
      if (response.err) return res.status(response.status).send(response.err);
      return res.status(response.status).send(response.data);
    } catch (err) {
      return res.status(400).send({ err });
    }
  };
}

export default CartController;
