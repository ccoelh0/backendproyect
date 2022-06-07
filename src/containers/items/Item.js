import mongoose from 'mongoose'
import config from '../../config.js'
import { itemSchema } from '../../models/ItemModel.js'

await mongoose.connect(config.mongobd.connection)

class Item {
    constructor(collectionName) {
        this.colection = mongoose.model(collectionName, itemSchema);
    }

    async save (object) {
        const newItem =  new this.colection(object)
        const itemSaved = await newItem.save()
        return itemSaved
    }

    async getAll() {
        return await this.colection.find()
    }

    async getById(id) {
        return await this.colection.find({_id: id})
    }

    async deleteById(id) {
        return await this.colection.findOneAndDelete({_id: id})    
    }

//     editById(id, object) {
//         return this.knex(this.bdName).where({id: id}).update(object)
//     }
}

export default Item;
