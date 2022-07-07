"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const faker_1 = require("@faker-js/faker");
let items = [];
const getItems = () => {
    for (let i = 0; i < 5; i++) {
        items.push({
            name: faker_1.faker.vehicle.vehicle(),
            price: faker_1.faker.commerce.price(1000, 10000),
            model: faker_1.faker.vehicle.model()
        });
    }
};
const router = express_1.default.Router();
exports.router = router;
router.get('/', (_, res) => {
    getItems();
    res.json(items);
    items = [];
});
