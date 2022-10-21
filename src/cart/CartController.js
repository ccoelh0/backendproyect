import CartService from "./CartService.js";
import ItemController from "../item/ItemController.js";

class CartController {
  constructor() {
    this.cartService = new CartService();
    this.itemController = new ItemController();
  }

  createNewCart = async (req, res) => {
    try {
      const { status, data, err } = await this.cartService.createNewCart(req.body.username);
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  getCart = async (req, res) => {
    try {
      const { status, err, data } = await this.cartService.getCart(
        req.params.id
      );
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  getItemsFromCart = async (req, res) => {
    try {
      const { status, data, err } = await this.cartService.getItemsFromCart(
        req.params.id
      );
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  deleteCart = async (req, res) => {
    try {
      const { status, data, err } = await this.cartService.deleteCart(
        req.params.id
      );
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send({ err });
    }
  };

  deleteItemFromCart = async (req, res) => {
    const cartId = req.params.id;
    const itemId = req.params.idItem;

    try {
      const { status, data, err } = await this.cartService.deleteItemFromCart(
        cartId,
        itemId
      );
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send({ err });
    }
  };

  addItemsToCart = async (req, res) => {
    const cartId = req.params.id;
    const itemId = req.params.idItem;

    try {
      const { status, data, err } = await this.cartService.addItemsToCart(
        cartId,
        itemId
      );
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  buyCart = async (req, res) => {
    const cart = req.params.idCart;
    try {
      const { status, err, data } = await this.cartService.buyCart(cart);
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}

export default CartController;
