class ChatDTO {
  constructor (data) {
    this.id = data._id.valueOf();
    this.author = data.author;
    this.message = data.message;
  }
}

export default ChatDTO;