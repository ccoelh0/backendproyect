import { Schema } from 'mongoose';

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