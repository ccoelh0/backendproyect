import Container from '../../Container.js'
import {chatSchema} from '../../../models/ChatSchema.js'

class ChatDao extends Container {
    constructor () {
        super('chat', chatSchema)
    }
}

export default ChatDao;