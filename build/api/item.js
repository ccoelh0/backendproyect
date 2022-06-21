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
exports.deleteItem = exports.updateItem = exports.saveItem = exports.getItem = void 0;
const ItemDaoMongo_1 = __importDefault(require("../daos/item/ItemDaoMongo"));
const item = new ItemDaoMongo_1.default();
const time = new Date();
const getItem = (res, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id) {
        const find = yield item.getById(id);
        return res.json({ data: find });
    }
    else {
        const find = yield item.getAll();
        return res.json({ data: find });
    }
});
exports.getItem = getItem;
const saveItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = req.body;
    try {
        yield item.save(newItem);
        return res.json({ data: 'guardado!' });
    }
    catch (err) {
        return res.json({ data: err });
    }
});
exports.saveItem = saveItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const update = req.body;
    yield item.updateById(id, update);
    return res.json({ data: `${id} actualizado` });
});
exports.updateItem = updateItem;
const deleteItem = (res, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield item.deleteById(id);
        return res.json({ data: `${id} eliminado` });
    }
    catch (err) {
        return res.json({ data: err });
    }
});
exports.deleteItem = deleteItem;
