import {chat} from '../daos/index'

export const saveMessage = async (message, res) => {
  try {
    await chat.save(message)
    return res.send({data: await chat.getAll()})
  } catch (err) {
    return res.send({err})
  }
}
