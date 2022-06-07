import mongoose from 'mongoose'
import config from '../../config.js'
import { itemSchema } from '../../models/ItemSchema.js'

await mongoose.connect(config.mongobd.connection)

class Item {
    constructor(collectionName) {
        this.collection = mongoose.model(collectionName, itemSchema);
    }

    async save (object) {
        const newItem =  new this.collection(object)
        const itemSaved = await newItem.save()
        return itemSaved
    }

    async getAll() {
        return await this.collection.find()
    }

    async getById(id) {
        return await this.collection.find({_id: id})
    }

    async deleteById(id) {
        return await this.collection.findOneAndDelete({_id: id})    
    }

    async editById(id, object) {
        return await this.collection.findOneAndUpdate({_id: id}, object)
    }
}

export default Item;
