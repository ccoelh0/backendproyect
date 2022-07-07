"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartSchema = void 0;
const mongoose_1 = require("mongoose");
exports.cartSchema = new mongoose_1.Schema({
    timestamp: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true,
    }
});
