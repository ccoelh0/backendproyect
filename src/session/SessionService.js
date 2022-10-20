import { transporter, emailToConfirmLogin } from "../utils/contact.js";
import SessionFactory from "./SessionFactory.js";
import config from "../utils/config.js";

class SessionService {
  constructor() {
    this.session = SessionFactory.create(config.mongobd.persistence);
  }

  getUser = async (req) => {
    if (req.user === undefined) return { err: "user hasn't log", status: 400 };
    return { data: req.user, status: 200 };
  };

  createNewUser = async (req) => {
    const { username } = req.body;

    try {
      await transporter.sendMail(emailToConfirmLogin(username));
      return { data: `${username} was created`, status: 200 };
    } catch (err) {
      return { err, status: 400 };
    }
  };
}

export default SessionService;

// export const logout = (req, res) => {
//   req.session.destroy()
//   return res.send({ data: true })
// }

// export const newUserWasCreated = async (req, res) => {
//   try {
//     await transporter.sendMail(emailOptionsLogin(req.body))
//     return res.send({ data: { userLogin: true } })
//   } catch (err) {
//     logger.error(err)
//     return res.send({data: {userLogin: false, err}})
//   }
// }

// export const getUser = (req, res) => {
//   const userEmail = req.user
//   return {data: userEmail}
// }

// export const validateLogin = async (req, res) => res.send({ data: { validate: true }})

// export default passport
