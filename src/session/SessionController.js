import SessionService from "./SessionService.js";

class SessionController {
  constructor() {
    this.sessionService = new SessionService();
  }

  getUser = async (req, res) => {
    try {
      const { status, err, data } = await this.sessionService.getUser(req.user);
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  createNewUser = async (req, res) => {
    try {
      const { status, err, data } = await this.sessionService.createNewUser(
        req.body
      );
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  validate = async (req, res) => {
    try {
      const { status, err, data } = await this.sessionService.validate(
        req.user
      );
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  logout = async (req, res) => {
    try {
      const { status, err, data } = await this.sessionService.logout(
        req.session
      );
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}

export default SessionController;
