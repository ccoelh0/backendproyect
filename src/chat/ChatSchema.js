import pkg from "mongoose";

const { Schema } = pkg;

export const chatSchema = new Schema({
  author: {
    username: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  message: {
    content: {
      type: String,
      required: true,
    },
    responseId: {
      type: String, 
      required: false
    }
  },
});
