"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const items_1 = require("./routes/items");
const cart_1 = require("./routes/cart");
const views_1 = require("./routes/views");
const product_test_1 = require("./routes/product-test");
const chat_1 = require("./routes/chat");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const chat_2 = require("./service/chat");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('public'));
app.use('/api/items', items_1.router);
app.use('/api/cart', cart_1.router);
app.use('/api/item-test', product_test_1.router);
app.use('/api/chat', chat_1.router);
app.use('/', views_1.router);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, chat_2.getAllMessage)();
    socket.emit('data-chat', data);
    socket.on('new-message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        socket.emit('update-chat', yield (0, chat_2.getAllMessage)());
    }));
}));
const port = process.env.PORT || 8090;
server.listen(port, () => console.log(`>>> ✅ Server is running in localhost:${port}!`));
