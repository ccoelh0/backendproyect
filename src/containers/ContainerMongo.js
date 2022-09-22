import mongoose from 'mongoose'
import config from '../utils/config.js'

mongoose.connect(`${config.mongobd.connectionAtlas}`).catch(err => console.log(err))

// todo: aplicar try and catch
class Container {
	constructor(collectionName, schema) {
		this.collection = mongoose.model(collectionName, schema);
	}

	save = async (object) => {
		const obj = new this.collection(object)
		return await obj.save()
	}

	getAll = async () => await this.collection.find()
	
	getById = async (id) => await this.collection.findOne({ _id: id })

	deleteById = async (id) => await this.collection.findOneAndDelete({ _id: id })	

	updateById = async (id, edit) => await this.collection.updateOne({ _id: id }, {$set: edit})
}

export default Container;