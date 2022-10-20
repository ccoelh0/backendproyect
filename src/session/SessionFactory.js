import SessionDao from "./SessionDao.js";

class SessionFactory {
  static create(persitence) {
    switch (persitence) {
      case "MONGO":
        return SessionDao.getInstance();
      default:
        throw new Error("Error in persistence user factory");
    }
  }
}

export default SessionFactory;
