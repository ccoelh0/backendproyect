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
  }
})

export default sessionSchema