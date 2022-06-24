import { item } from '../daos/index'
import { INewItem, IUpdateItem } from '../utils/types'

const getItem = async (res, id: string | boolean) => {
  if (id) {
    try {
      const find = await item.getById(id)
      return res.json({ data: find })
    } catch (err) {
      return res.status(400).send({ err })
    }
  } else {
    try {
      const find = await item.getAll()
      return res.json({ data: find })
    } catch (err) {
      return res.status(400).send({ err })
    }
  }
}

const saveItem = async (req, res) => {
  const newItem: INewItem = req.body
  try {
    await item.save(newItem)
    return res.json({ data: req.body.name + ' guardado!' })
  } catch (err) {
    return res.status(400).send({ data: err })
  }
};

const updateItem = async (req, res) => {
  const id = req.params.id
  const update: IUpdateItem = req.body

  try {
    await item.updateById(id, {$set: update})
    return res.json({ data: `${id} actualizado` })
  } catch (err) {
    return res.status(400).send({err})
  }
}

const deleteItem = async (res, id: string) => {
  try {
    await item.deleteById(id)
    return res.json({ data: `${id} eliminado` })
  } catch (err) {
    return res.json({ data: err })
  }
}

export { getItem, saveItem, updateItem, deleteItem }