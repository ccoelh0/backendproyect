import Container from '../containers/ContainerMongo.js'
import {chatSchema} from './ChatSchema.js'

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