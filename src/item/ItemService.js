import ItemFactory from "./ItemFactory.js";
import ItemDTO from "./ItemDto.js";
import config from "../utils/config.js";

class ItemService {
  constructor() {
    this.item = ItemFactory.create(config.mongobd.persistence);
  }

  getItem = async (id) => {
    try {
      if (id) {
        const find = await this.item.getById(id);
        if (find.err !== undefined) return find
        return new ItemDTO(find);
      } else {
        const data = await item.getAll();
        return data.map((x) => new ItemDTO(x));
      }
    } catch (err) {
      return err;
    }
  };

  saveItem = async (newItem) => {
    try {
      return await this.item.save(newItem);
    } catch (err) {
      return err;
    }
  };

  updateItem = async (id, update) => {
    try {
      return await this.item.updateById(id, update);
    } catch (err) {
      return err;
    }
  };

  deleteItem = async (id) => {
    try {
      return await this.item.deleteById(id)
    } catch(err) {
      return err
    }
  };
}

export default ItemService;