import * as ItemService from './ItemService.js'

class ItemController {
  constructor() {
    this.itemService = ItemService;
  }

  getItem = async (req, res) => {
    const id = req.body.id || req.params.id
  
    try {
      const data = await this.itemService.getItem(id)
      return res.send(data)
    } catch (err) {
      return res.status(400).send(err.message)
    }
  }

  saveItem = async (req, res) => {
    const newItem = req.body
    if (newItem === undefined) return res.status(400).send({ err: 'Item no definido' })

    try {
      await this.itemService.saveItem(newItem)
      return res.send('Producto guardado!')
    } catch (err) {
      return res.status(400).send(err.message)
    }
  }

  updateItem = async (req, res) => {
    const id = req.params.id
    const update = req.body || req.params
    if (update === undefined) return res.status(400).send({ err: 'Item no definido' })

    try {
      await this.itemService.updateItem(id, update)
      return res.send({ data: 'Producto actualizado!' })
    } catch (err) {
      return res.status(400).send(err.message)
    }
  }

  deleteItem = async (req, res) => {
    try {
      await this.itemService.deleteItem(req.params.id)
      return res.send({ data: 'Producto eliminado!' })
    } catch (err) {
      return res.status(400).send(err)
    }
  }
}

export default ItemController;