"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_1 = require("../service/cart");
const router = express_1.default.Router();
router.post('/', (_, res) => (0, cart_1.createNewCart)(res));
router.get('/', (req, res) => (0, cart_1.getCart)(false, res));
router.get('/:id', (req, res) => (0, cart_1.getCart)(req.params.id, res));
router.delete('/:id', (req, res) => (0, cart_1.deleteCart)(res, req.params.id));
router.get('/:id/items', (req, res) => (0, cart_1.getItemsFromCart)(req.params.id, res));
router.post('/:id/items/:idItem', (req, res) => (0, cart_1.addItemsToCart)(req, res));
router.delete('/:id/items/:idItem', (req, res) => (0, cart_1.deleteItemFromCart)(req, res));
const routerItems = router;
exports.default = routerItems;
