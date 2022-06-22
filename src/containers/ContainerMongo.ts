import mongoose from 'mongoose'
import config from '../utils/config'
import {INewItem, INewCart} from '../utils/types'

mongoose.connect(config.mongobd.connection).catch(err => console.log(err))

class Container {
	collection: any

	constructor(collectionName, schema) {
		this.collection = mongoose.model(collectionName, schema);
	}

	async save(object) {
		const obj = new this.collection(object)
		return await obj.save()
	}

	async getAll() {
		return await this.collection.find()
	}

	async getById(id) {
		return await this.collection.findOne({ _id: id })
	}

	async deleteById(id) {
		return await this.collection.findOneAndDelete({ _id: id })
	}

	async updateById(id, edit) {
		return await this.collection.findOneAndUpdate({ _id: id, items: edit})
	}
}

export default Container;