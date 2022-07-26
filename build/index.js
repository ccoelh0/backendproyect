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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const chat_1 = require("./service/chat");
const items_1 = __importDefault(require("./routes/items"));
const cart_1 = __importDefault(require("./routes/cart"));
const views_1 = __importDefault(require("./routes/views"));
const chat_2 = __importDefault(require("./routes/chat"));
const session_1 = __importDefault(require("./routes/session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const session_2 = __importDefault(require("./service/session"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('public'));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    maxAge: 60000
}));
app.use(session_2.default.initialize());
app.use(session_2.default.session());
// Routes 
app.use('/api/sessions', session_1.default);
app.use('/api/items', items_1.default);
app.use('/api/cart', cart_1.default);
app.use('/api/chat', chat_2.default);
app.use('/', views_1.default);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, chat_1.getAllMessage)();
    socket.emit('data-chat', data);
    socket.on('new-message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        socket.emit('update-chat', yield (0, chat_1.getAllMessage)());
    }));
}));
const port = process.env.PORT || 8090;
server.listen(port, () => console.log(`>>> ✅ Server is running in localhost:${port}!`));
