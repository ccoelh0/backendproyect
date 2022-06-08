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
       return await this.collection.find({_id: id})
    }

    async deleteById(id, idCart) {
       if (idCart === undefined) return await this.collection.findOneAndDelete({_id: id})  
       return this.collection.findOneAndDelete({_id: idCart}, {$eq: {items: [{id: id}]}})  
    }

    async editById(id, newElement) {
        if (typeof newElement === 'object') return await this.collection.findOneAndUpdate({_id: id}, newElement)
        if (typeof newElement === 'string') {
            return await this.collection.findOneAndUpdate({_id: id}, {$push: {items: {id: newElement}}})
        }
    }
}

export default Container;