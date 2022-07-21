"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.session = exports.chat = exports.cart = exports.item = void 0;
const ItemDaoMongo_1 = __importDefault(require("./item/ItemDaoMongo"));
const CartDaoMongo_1 = __importDefault(require("./cart/CartDaoMongo"));
const ChatDaoMongo_1 = __importDefault(require("./chat/ChatDaoMongo"));
const SessionDao_1 = __importDefault(require("./Session/SessionDao"));
const ItemDaoFirebase_1 = __importDefault(require("./item/ItemDaoFirebase"));
const CartDaoFirebase_1 = __importDefault(require("./cart/CartDaoFirebase"));
let item, cart, chat, session;
exports.item = item;
exports.cart = cart;
exports.chat = chat;
exports.session = session;
let database = 'mongodb';
if (database === 'mongodb') {
    exports.item = item = new ItemDaoMongo_1.default();
    exports.cart = cart = new CartDaoMongo_1.default();
    exports.chat = chat = new ChatDaoMongo_1.default();
    exports.session = session = new SessionDao_1.default();
}
if (database === 'firebase') {
    exports.item = item = new ItemDaoFirebase_1.default();
    exports.cart = cart = new CartDaoFirebase_1.default();
}
