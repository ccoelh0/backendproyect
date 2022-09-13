import ItemFactory from './ItemFactory.js'
import ItemDTO from './ItemDTO.js'
import logger from '../../../utils/logger.js'
import config from '../../../utils/config.js'

const item = ItemFactory.create(config.mongobd.persistence)

const getItem = async (req, res) => {
  try {
    if (req.body.id) {
      const find = await item.getById(req.body.id)
      const itemDTO = new ItemDTO(find)
      return res.json({ data: itemDTO })
    } else {
      const data = await item.getAll()
      const itemsDTO = data.map(x => new ItemDTO(x))
      return res.json({ data: itemsDTO })
    }
  } catch (err) {
    logger.error(err)
    return res.send(err)
  }
}

const saveItem = async (req, res) => {
  const newItem = req.body
  try {
    const res = await item.save(newItem)
    return res.json({ data: true })
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
    return res.json({ data: true })
  } catch (err) {
    logger.error(err)
    return res.status(400).send({ err })
  }
}

const deleteItem = async (req, res) => {
  try {
    await item.deleteById(req.body.id)
    return res.json({ data: true })
  } catch (err) {
    logger.error(err)
    return res.json({ data: err })
  }
}

export { getItem, saveItem, updateItem, deleteItem }