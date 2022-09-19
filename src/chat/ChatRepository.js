import ChatFactory from "./ChatFactory.js";
import config from "../utils/config.js";
import ChatDTO from "./ChatDTO.js";

class ChatRepository {
  constructor() {
    this.chatDao = ChatFactory.create(config.mongobd.persistence)
  }

  async getAll() {
    const chatsDTO = await this.chatDao.getAll()
    return chatsDTO.map(x => new ChatDTO(x))
  }

  async save(message) {
    return await this.chatDao.save(message)
  }
}

export default ChatRepository