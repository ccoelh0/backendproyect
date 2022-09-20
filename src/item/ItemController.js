import * as ItemService from './ItemService.js'

class ItemController {
  constructor() {
    this.itemService = ItemService;
  }

  getItem = async (req, res) => {
    try {
      return await this.itemService.getItem(req.body.id, res)
    } catch (err) {
      throw new Error(err)
    }
  }

  saveItem = async (req, res) => {
    const newItem = req.body
    try {
      return await this.itemService.saveItem(newItem, res)
    } catch (err) {
      throw new Error(err)
    }
  }

  updateItem = async (req, res) => {
    const id = req.params.id
    const update = req.body

    try {
      return await this.itemService.updateItem(id, update, res)
    } catch (err) {
      throw new Error(err)
    }
  }

  deleteItem = async (req, res) => {
    try {
      return await this.itemService.deleteItem(req.params.id, res)
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default ItemController;