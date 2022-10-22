class SessionDTO {
  constructor(data) {
    this.name = data.name;
    this.username = data.username;
    this.isAdmin = data.isAdmin
    this.cartId = data.cartId;
  }
}

export default SessionDTO;