"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const root = { root: '.' };
// router.get('/items', (req, res) => res.sendFile('public/items.html', {root: '.'}))
// router.get('/cart', (req, res) => res.sendFile('public/cart.html', {root: '.'}))
router.get('/item', (_, res) => res.sendFile('/public/itemTest.html', root));
router.get('/chat', (_, res) => res.sendFile('/public/chat.html', root));
router.get('/login', (_, res) => res.sendFile('/public/login.html', root));
router.get('/index', (_, res) => res.sendFile('/public/index.html', root));
const routerViews = router;
exports.default = routerViews;
