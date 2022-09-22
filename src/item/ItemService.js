import ItemFactory from './ItemFactory.js'
import ItemDTO from './ItemDto.js'
import config from '../utils/config.js'

const item = ItemFactory.create(config.mongobd.persistence)

const getItem = async (id) => {
  if (id) {
    const find = await item.getById(id)
    return new ItemDTO(find)
  } else {
    const data = await item.getAll()
    return data.map(x => new ItemDTO(x))
  }
}

const saveItem = async (newItem) => await item.save(newItem)

const updateItem = async (id, update) => await item.updateById(id, update)

const deleteItem = async (id) => await item.deleteById(id)

export { getItem, saveItem, updateItem, deleteItem }