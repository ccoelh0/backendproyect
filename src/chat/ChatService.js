import config from "../config.js";
import ChatDTO from "./ChatDto.js";
import ChatFactory from "./ChatFactory.js";

class ChatService {
  constructor() {
    this.chat = ChatFactory.create(config.db.persistence);
    this.chatDTO = ChatDTO;
  }

  getMessages = async () => {
    try {
      const response = await this.chat.getAll();
      if (response.err !== undefined) return { err: response.err, status: 400 };
      return { data: response.map((x) => new this.chatDTO(x)), status: 200 };
    } catch (err) {
      return err;
    }
  };

  saveMessage = async (message) => {
    if (message === undefined)
      return { err: "message is undefined", status: 400 };

    try {
      const response = await this.chat.save(message);
      if (response.err) return { err: response.err, status: 400 };
      return { data: new this.chatDTO(response), status: 200 };
    } catch (err) {
      return err;
    }
  };
}

export default ChatService;