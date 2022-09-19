import ChatDao from "./ChatDao.js"

class ChatFactory {
  static create (persitence) {
    switch (persitence) {
      case 'MONGO':
        return ChatDao.getInstance()
      default: 
        throw new Error('Error in persistence item factory')
    }
  }
}

export default ChatFactory