"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContainerFirebase_1 = __importDefault(require("../../containers/ContainerFirebase"));
class ItemsDaoFirebase extends ContainerFirebase_1.default {
    constructor() {
        super('items');
    }
}
exports.default = ItemsDaoFirebase;
