"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContainerMongo_1 = __importDefault(require("../../containers/ContainerMongo"));
const CartSchema_1 = require("../../models/CartSchema");
class CartDaoMongo extends ContainerMongo_1.default {
    constructor() {
        super('cart', CartSchema_1.cartSchema);
    }
}
exports.default = CartDaoMongo;
