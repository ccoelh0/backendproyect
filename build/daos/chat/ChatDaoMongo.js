"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContainerMongo_1 = __importDefault(require("../../containers/ContainerMongo"));
const ChatSchema_1 = require("../../models/ChatSchema");
class ChatDaoMongo extends ContainerMongo_1.default {
    constructor() {
        super('chat', ChatSchema_1.chatSchema);
    }
}
exports.default = ChatDaoMongo;
