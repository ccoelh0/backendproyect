class ChatDTO {
  constructor (data) {
    this.author = data.author;
    this.message = data.message;
    this.id = data.id
  }
}

export default ChatDTO;