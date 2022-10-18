import ItemFactory from "./ItemFactory.js";
import ItemDTO from "./ItemDto.js";
import config from "../utils/config.js";

class ItemService {
  constructor() {
    this.item = ItemFactory.create(config.mongobd.persistence);
    this.itemDTO = ItemDTO;
  }

  getItem = async (id) => {
    try {
      if (id) {
        const find = await this.item.getById(id);
        if (find === null) return { err: "id not found", status: 400 };
        if (find.err !== undefined) return { err: find.err, status: 400 };
        return { data: new this.itemDTO(find), status: 200 };
      } else {
        const findAll = await this.item.getAll();
        if (findAll.err !== undefined) return { err: findAll.err, status: 400 };
        return { data: findAll.map((x) => new this.itemDTO(x)), status: 200 };
      }
    } catch (err) {
      return err;
    }
  };

  saveItem = async (newItem) => {
    if (newItem === undefined) return { err: "Item is undefined", status: 400 };

    try {
      const response = await this.item.save(newItem);
      if (response.err) return { err: response.err, status: 400 };
      return { data: response, status: 200 };
    } catch (err) {
      return { err };
    }
  };

  updateItem = async (id, update) => {
    if (id === undefined || update === undefined)
      return { err: "id or update is undefined", status: 400 };

    try {
      const response = await this.item.updateById(id, update);
      if (response === null) return { err: "id not found", status: 400 };
      if (response.err) return { err: response.err, status: 400 };
      return { data: `${id} is updated!`, status: 200 };
    } catch (err) {
      return err;
    }
  };

  deleteItem = async (id) => {
    if (id === undefined) return { err: "id is undefined", status: 400 };

    try {
      const response = await this.item.deleteById(id);
      if (response === null) return { err: "id not found", status: 400 };
      if (response.err !== undefined) return { err: response.err, status: 400 };
      return { data: `${id} is deleted!`, status: 200 };
    } catch (err) {
      return err;
    }
  };
}

export default ItemService;
