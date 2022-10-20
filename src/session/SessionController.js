import SessionService from "./SessionService.js";

class SessionController {
  constructor() {
    this.sessionService = new SessionService();
  }

  getUser = async (req, res) => {
    try {
      const { status, err, data } = await this.sessionService.getUser(req);
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  createNewUser = async (req, res) => {
    try {
      const { status, err, data } = await this.sessionService.createNewUser(
        req
      );
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}

export default SessionController;
