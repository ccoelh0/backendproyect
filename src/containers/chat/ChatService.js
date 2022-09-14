import { chat } from '../index.js'
import { schema, normalize } from 'normalizr'
import logger from '../../utils/logger.js'
import ChatRepository from './ChatRepository.js'

const chatRepository = new ChatRepository()

export const getAllMessage = async () => await chatRepository.getAll()

export const saveMessage = async (req, res) => {
  const message = req.body
  try {
    await chatRepository.save(message)
    return res.send({ data: await chatRepository.getAll() })
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
  const response = await chatRepository.getAll()
  const messages = response.map(x => {
    return { id: x.id, author: x.author, message: x.message }
  })
  return { id: 'mangaecommerce', messages: messages }
}

export const renderMessagesNorm = (_, res) => normMessage().then(response => res.send(normalize(response, postSchema)))

