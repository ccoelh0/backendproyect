import { transporter, emailToConfirmLogin } from "../utils/contact.js";
import SessionFactory from "./SessionFactory.js";
import config from "../utils/config.js";
import SessionDTO from "./SessionDto.js";
import CartService from "../cart/CartService.js";

class SessionService {
  constructor() {
    this.session = SessionFactory.create(config.mongobd.persistence);
    this.sessionDTO = SessionDTO;
    this.cart = new CartService();
  }

  getUser = async (user) => {
    try {
      if (user === undefined) return { err: "user hasn't log", status: 400 };

      let dataToDTO = {
        name: user.name,
        username: user.username,
      };

      const cart = await this.cart.getCart();

      if (cart.err) return { err: "An error has ocurred", status: 500 };

      let userCart = cart.data.find((x) => x.username === user.username);

      if (userCart === undefined) {
        const newCart = await this.cart.createNewCart(user.username);
        if (newCart.err) return { err: "An error has ocurred", status: 500 };
        userCart = newCart.data.id;
      } else {
        userCart = userCart.id;
      }

      dataToDTO = { ...dataToDTO, cartId: userCart };
      const dto = new this.sessionDTO(dataToDTO);
      return { data: dto, status: 200 };
    } catch (err) {
      return { err, status: 500 };
    }
  };

  createNewUser = async (body) => {
    const { username } = body;

    try {
      await transporter.sendMail(emailToConfirmLogin(username));
      return { data: `${username} was created`, status: 200 };
    } catch (err) {
      return { err, status: 500 };
    }
  };

  validate = async (user) => {
    try {
      if (user === undefined)
        return { err: "Username or password is incorrect", status: 400 };
      return { data: `${user.username}'s login is valide`, status: 200 };
    } catch (err) {
      return { err, status: 500 };
    }
  };

  logout = async (session) => {
    try {
      session.destroy();
      return { data: "logout confirmed!", status: 200 };
    } catch (err) {
      return { data: "An error has ocurred", status: 500 };
    }
  };
}

export default SessionService;
