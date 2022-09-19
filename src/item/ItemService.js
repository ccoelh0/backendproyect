import ItemFactory from './ItemFactory.js'
import ItemDTO from './ItemDto.js'
import config from '../utils/config.js'

const item = ItemFactory.create(config.mongobd.persistence)

const getItem = async (id, res) => {
  try {
    if (id) {
      const find = await item.getById(id)
      const itemDTO = new ItemDTO(find)
      return res.json({ data: itemDTO })
    } else {
      const data = await item.getAll()
      const itemsDTO = data.map(x => new ItemDTO(x))
      return res.json({ data: itemsDTO })
    }
  } catch (err) {
    return res.send(err)
  }
}

const saveItem = async (newItem, res) => {
  try {
    const res = await item.save(newItem)
    return res.json({ data: true })
  } catch (err) {
    return res.status(400).send({ data: err })
  }
};

const updateItem = async (id, update, res) => {
  try {
    await item.updateById(id, update)
    return res.json({ data: true })
  } catch (err) {
    return res.status(400).send({ err })
  }
}

const deleteItem = async (id, res) => {
  try {
    await item.deleteById(id)
    return res.json({ data: true })
  } catch (err) {
    return res.json({ data: err })
  }
}

export { getItem, saveItem, updateItem, deleteItem }