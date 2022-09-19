import * as CartService from './CartService.js'
// import ItemService from '../item/ItemService.js';
// import config from '../utils/config.js';

class CartController {
  constructor() {
    this.cartService = CartService;
    this.time = new Date();
  }

  createNewCart = async (req, res) => {
    const newCart = {
      email: req.body.email,
      timestamp: `${this.time.getDate()}/${this.time.getMonth() + 1}/${this.time.getFullYear()}`,
      items: []
    }

    try {
      return await this.cartService.createNewCart(newCart, res)
    } catch (err) {
      throw new Error(err)
    }
  }

  getCart = async (req, res) => {
    try {
      return await this.cartService.getCart(req.params.id, res)
    } catch (err) {
      throw new Error(err)
    }
  }

  getItemsFromCart = async (req, res) => {
    try {
      return await this.cartService.getCart(req.params.id, res)
    } catch (err) {
      throw new Error(err)
    }
  }

  deleteCart = async (req, res) => {
    try {
      return await this.cartService.deleteCart(req.params.id, res)
    } catch (err) {
      throw new Error(err)
    }
  }

  // addItemsToCart = async (req, res) => {
  //   const cartId = req.params.id
  //   const itemData = this.item.get
  // } 
}

export default CartController;