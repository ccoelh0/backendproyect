"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const items_1 = require("./routes/items");
// import {router as routerCart} from './routes/cart.js'
const views_1 = require("./routes/views");
const app = (0, express_1.default)();
app.use(express_1.default.json()); // midelware que transforma la req.body en json
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('public'));
app.use('/api/items', items_1.router);
// app.use('/api/cart', routerCart)
app.use('/', views_1.router);
const port = process.env.PORT || 8090;
app.listen(port, () => console.log(`>>> ✅ Server is running in localhost:${port}!`));
