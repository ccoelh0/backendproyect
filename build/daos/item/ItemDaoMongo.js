"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContainerMongo_1 = __importDefault(require("../../containers/ContainerMongo"));
const ItemSchema_1 = require("../../models/ItemSchema");
class ItemDaoMongo extends ContainerMongo_1.default {
    constructor() {
        super('items', ItemSchema_1.itemSchema);
    }
}
exports.default = ItemDaoMongo;
