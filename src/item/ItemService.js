import ItemFactory from "./ItemFactory.js";
import ItemDTO from "./ItemDto.js";
import config from "../utils/config.js";

class ItemService {
  constructor() {
    this.item = ItemFactory.create(config.mongobd.persistence);
  }

  getItem = async (id) => {
    if (id) {
      const find = await this.item.getById(id);
      return new ItemDTO(find);
    } else {
      const data = await item.getAll();
      return data.map((x) => new ItemDTO(x));
    }
  };

  saveItem = async (newItem) => await this.item.save(newItem);

  updateItem = async (id, update) => await this.item.updateById(id, update);

  deleteItem = async (id) => await this.item.deleteById(id);
}

export default ItemService;