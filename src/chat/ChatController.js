import ChatService from "./ChatService.js";

class ChatController {
  constructor() {
    this.chatService = new ChatService();
  }

  initialize = (io) => {
    return io.on("connection", async (socket) => {
      const { data } = await this.chatService.getMessages();
      socket.emit("data-chat", data);

      socket.on("new-message", async () => {
        const { data } = await this.chatService.getMessages();
        socket.emit("update-chat", data);
      });
    });
  };

  getMessages = async (_, res) => {
    try {
      const { status, err, data } = await this.chatService.getMessages();
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  saveMessage = async (req, res) => {
    try {
      const { status, err, data } = await this.chatService.saveMessage(
        req.body
      );
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}

export default ChatController;
