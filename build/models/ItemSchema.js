"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemSchema = void 0;
const mongoose_1 = require("mongoose");
exports.itemSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: String,
        required: true
    }
});
