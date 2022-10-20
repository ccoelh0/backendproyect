import Container from "../containers/ContainerMongo.js";
import sessionSchema from "./SessionSchema.js";

let instance = null;

class SessionDao extends Container {
  constructor() {
    super("users", sessionSchema);
  }

  static getInstance() {
    if (!instance) return (instance = new SessionDao());
    return instance;
  }
}

export default SessionDao;
