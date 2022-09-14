import Container from '../Container.js'
import {chatSchema} from '../../models/ChatSchema.js'

let instance = null

class ChatDao extends Container {
    constructor () {
        super('chat', chatSchema)
    }

    static getInstance () {
        if (!instance) return instance = new ChatDao()
        return instance
    }
}

export default ChatDao;