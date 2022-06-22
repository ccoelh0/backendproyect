import { Schema } from 'mongoose';

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