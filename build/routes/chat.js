"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_1 = require("../service/chat");
const router = express_1.default.Router();
router.get('', (_, res) => (0, chat_1.renderMessagesNorm)(res));
router.post('', (req, res) => (0, chat_1.saveMessage)(req.body, res));
const routerChat = router;
exports.default = routerChat;
