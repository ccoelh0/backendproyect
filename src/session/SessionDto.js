class SessionDTO {
  constructor(userData, cartData) {
    this.name = userData.name;
    this.email = userData.email;
    this.cart = cartData._id;
  }
}

export default SessionDTO;