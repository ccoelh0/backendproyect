import Container from '../../containers/Container.js'
import {chatSchema} from '../../models/ChatSchema.js'

class ChatDaoMongo extends Container {
    constructor () {
        super('chat', chatSchema)
    }
}

export default ChatDaoMongo;