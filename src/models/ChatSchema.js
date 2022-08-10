import pkg from 'mongoose';

const { Schema } = pkg;

export const chatSchema = new Schema({
  author: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    }, 
    alias: {
      type: String
    },
    avatar: {
      type: String,
      required: true
    },
  },
  message: {
    type: String,
    required: true
  },
})