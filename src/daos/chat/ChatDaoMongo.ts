import Container from '../../containers/ContainerMongo'
import {chatSchema} from '../../models/ChatSchema'

class ChatDaoMongo extends Container {
    constructor () {
        super('chat', chatSchema)
    }
}

export default ChatDaoMongo;