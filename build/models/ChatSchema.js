"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSchema = void 0;
const mongoose_1 = require("mongoose");
exports.chatSchema = new mongoose_1.Schema({
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
});
