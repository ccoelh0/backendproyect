"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const item_1 = require("../api/item");
const isAdmin_1 = require("../utils/isAdmin");
const router = express_1.default.Router(); // aplicar next()
exports.router = router;
router.get('/', (_req, res) => (0, item_1.getItem)(res, false));
router.get('/:id', (req, res) => (0, item_1.getItem)(res, req.params.id));
router.post('/', isAdmin_1.isAdmin, (req, res) => (0, item_1.saveItem)(req, res));
router.put('/:id', isAdmin_1.isAdmin, (req, res) => (0, item_1.updateItem)(req, res));
router.delete('/:id', isAdmin_1.isAdmin, (req, res) => (0, item_1.deleteItem)(res, req.params.id));
