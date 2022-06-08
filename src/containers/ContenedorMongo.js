import { Db } from 'mongodb';
import mongoose from 'mongoose'
import config from '../config.js'

await mongoose.connect(config.mongobd.connection)

class Container {
    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema);
    }

    async save (object) {
        const obj = new this.collection(object)
        const objSaved = await obj.save()
        return objSaved
    }

    async getAll() {
        return await this.collection.find()
    }

    async getById(id) {
       return await this.collection.findOne({_id: id})
    }

    async deleteById(id) {
            return await this.collection.findOneAndDelete({_id: id})  
    }

    async updateById(id, edit) {
       return await this.collection.findByIdAndUpdate({_id: id}, edit)
    }
}

export default Container;