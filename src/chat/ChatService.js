import config from "../config.js";
import ChatDTO from "./ChatDto.js";
import ChatFactory from "./ChatFactory.js";

class ChatService {
  constructor() {
    this.chat = ChatFactory.create(config.db.persistence);
    this.chatDTO = ChatDTO;
  }

  getMessages = async (email) => {
    try {
      const response = await this.chat.getAll();
      if (response.err !== undefined) return { err: response.err, status: 400 };

      if (email !== undefined) {
        const userMessages = response.filter(
          (x) => x.author.username === email
        );

        return {
          data: userMessages.map((x) => new this.chatDTO(x)),
          status: 200,
        };
      } else {
        return { data: response.map((x) => new this.chatDTO(x)), status: 200 };
      }
    } catch (err) {
      return err;
    }
  };

  saveMessage = async (message, idChat) => {
    if (message === undefined)
      return { err: "message is undefined", status: 400 };

    let msg = message;

    if (idChat) {
      msg = {
        author: {
          username: message.author.username,
          isAdmin: true,
        },
        message: {
          content: message.message.content,
          responseId: idChat,
        },
      };
    }

    try {
      const response = await this.chat.save(msg);
      if (response.err) return { err: response.err, status: 400 };
      return { data: new this.chatDTO(response), status: 200 };
    } catch (err) {
      return err;
    }
  };
}

export default ChatService;
