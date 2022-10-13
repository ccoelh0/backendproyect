import mongoose from "mongoose";
import config from "../utils/config.js";

mongoose
  .connect(`${config.mongobd.connectionAtlas}`)
  .catch((err) => console.log(err));

// todo: aplicar try and catch
class Container {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema);
  }

  save = async (object) => {
    const obj = new this.collection(object);
    return await obj.save();
  };

  getAll = async () => await this.collection.find();

  getById = async (id) => await this.collection.findOne({ _id: id });

  deleteById = async (id) => {
    try {
      return await this.collection.findOneAndDelete({ _id: id });
    } catch (err) {
			console.log('container', err)
      return err;
    }
  };

  updateById = async (id, edit) => {
    try {
      return await this.collection.updateOne({ _id: id }, { $set: edit });
    } catch (err) {
      return err;
    }
  };
}

export default Container;
