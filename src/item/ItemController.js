import ItemService from "./ItemService.js";

class ItemController {
  constructor() {
    this.itemService = new ItemService();
  }

  getItem = async (req, res) => {
    const id = req.body.id || req.params.id;

    try {
      const { status, data, err } = await this.itemService.getItem(id);
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  saveItem = async (req, res) => {
    const newItem = req.body;

    try {
      const { status, data, err } = await this.itemService.saveItem(newItem);
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  updateItem = async (req, res) => {
    const id = req.params.id;
    const update = req.body || req.params;

    try {
      const { status, err, data } = await this.itemService.updateItem(
        id,
        update
      );
      return res.status(status).send(data || err);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  };

  deleteItem = async (req, res) => {
    try {
      const {status, data, err} = await this.itemService.deleteItem(
        req.params.id
      );
      return res.status(status).send(err || data);
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}

export default ItemController;
