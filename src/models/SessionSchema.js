import pkg from 'mongoose';

const { Schema } = pkg;

export const sessionSchema = new Schema({
  email: {
    type: String, 
    required: true
  },
  password: {
    type: String, 
    required: true
  },
  adress: {
    type: String,
    required: true
  }, 
  name: {
    type: String,
    required: true
  }, 
  phone: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }, 
  avatar: {
    type: String, 
    required: false
  }
})

export default sessionSchema