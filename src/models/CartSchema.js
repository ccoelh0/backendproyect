import pkg from 'mongoose';

const { Schema } = pkg;

export const cartSchema = new Schema({
	timestamp: {
		type: String,
		required: true
	},
	items: {
		type: Array,
		required: true,
	}
})