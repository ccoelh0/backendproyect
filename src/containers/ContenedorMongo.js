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
        return await this.collection.find({_id: id})
    }

    async deleteById(id) {
        return await this.collection.findOneAndDelete({_id: id})    
    }

    async editById(id, objectOrId) {
        if (typeof objectOrId === 'object') return await this.collection.findOneAndUpdate({_id: id}, objectOrId)
        if (typeof objectOrId === 'string') {
            // const collection = await this.collection.insert({id: id}, {$set: {items: objectOrId}})
            // return collection
            return await this.collection.findById({_id: id})
        }
    }
}

export default Container;