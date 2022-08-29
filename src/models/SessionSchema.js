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
    required: false
  }, 
  name: {
    type: String,
    required:false
  }, 
  phone: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: false
  }, 
  avatar: {
    type: String, 
    required: false
  }
})

export default sessionSchema