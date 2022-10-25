import pkg from "mongoose";

const { Schema } = pkg;

const orderSchema = new Schema({
  items: {
    type: Array,
    required: true,
  },
  orderNumber: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

export default orderSchema