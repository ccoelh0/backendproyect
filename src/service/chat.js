import { chat } from '../daos/index.js'
import { schema, normalize } from 'normalizr'
import logger from '../utils/logger.js'

export const getAllMessage = async () => await chat.getAll()

export const saveMessage = async (message, res) => {
  try {
    await chat.save(message)
    return res.send({ data: await chat.getAll() })
  } catch (err) {
    logger.error(err)
    return res.send({ err })
  }
}

const authorSchema = new schema.Entity('authors')
const commentSchema = new schema.Entity('messages')

const postSchema = new schema.Entity('posts', {
  author: authorSchema,
  messages: [commentSchema]
});

const normMessage = async () => {
  const response = await getAllMessage()
  const messages = response.map(x => {
    return { id: x._id.valueOf(), author: x.author, message: x.message }
  })
  return { id: 'mangaecommerce', messages: messages }
}

export const renderMessagesNorm = (res) => normMessage().then(response => res.send(normalize(response, postSchema)))

