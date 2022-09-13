import { item } from '../containers/dao/index.js'
import logger from '../utils/logger.js'

const getItem = async (res, id) => {
  try {
    if (id) {
      const find = await item.getById(id)
      return res.json({ data: find })
    } else {
      const find = await item.getAll()
      return res.json({ data: find })
    }
  } catch (err) {
    logger.error(err)
    return res.send(err)
  }
}

const saveItem = async (req, res) => {
  const newItem = req.body
  try {
    await item.save(newItem)
    return res.json({ data: req.body.name + ' guardado!' })
  } catch (err) {
    logger.error(err)
    return res.status(400).send({ data: err })
  }
};

const updateItem = async (req, res) => {
  const id = req.params.id
  const update = req.body

  try {
    await item.updateById(id, update)
    return res.json({ data: `${id} actualizado` })
  } catch (err) {
    logger.error(err)
    return res.status(400).send({ err })
  }
}

const deleteItem = async (res, id) => {
  try {
    await item.deleteById(id)
    return res.json({ data: `${id} eliminado` })
  } catch (err) {
    logger.error(err)
    return res.json({ data: err })
  }
}

export { getItem, saveItem, updateItem, deleteItem }