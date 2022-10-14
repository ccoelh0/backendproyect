import mongoose from "mongoose";
import config from "../utils/config.js";

mongoose
  .connect(`${config.mongobd.connectionAtlas}`)
  .catch((err) => console.log(err));

class Container {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema);
  }

  save = async (object) => {
    const obj = new this.collection(object);
    try {
      return await obj.save();
    } catch (err) {
      return {err};
    }
  };

  getAll = async () => {
    try {
      return await this.collection.find();
    } catch (err) {
      return {err};
    }
  };

  getById = async (id) => {
    try {
      return await this.collection.findOne({ _id: id });
    } catch (err) {
      return {err};
    }
  };

  deleteById = async (id) => {
    try {
      return await this.collection.findOneAndDelete({ _id: id });
    } catch (err) {
      return {err};
    }
  };

  updateById = async (id, edit) => {
    try {
      return await this.collection.updateOne({ _id: id }, { $set: edit });
    } catch (err) {
      return {err};
    }
  };
}

export default Container;
