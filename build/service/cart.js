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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemFromCart = exports.addItemsToCart = exports.getItemsFromCart = exports.deleteCart = exports.getCart = exports.createNewCart = void 0;
const index_1 = require("../daos/index");
const time = new Date();
const createNewCart = (res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCart = {
        timestamp: `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`,
        items: []
    };
    try {
        const created = yield index_1.cart.save(newCart);
        return res.json({ data: created });
    }
    catch (err) {
        return res.status(400).send({ err: 'Bad request' });
    }
});
exports.createNewCart = createNewCart;
const getCart = (id, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id)
            return res.json({ data: yield index_1.cart.getById(id) });
        return res.json({ data: yield index_1.cart.getAll() });
    }
    catch (err) {
        return res.status(400).send({ err });
    }
});
exports.getCart = getCart;
const getItemsFromCart = (id, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartSelected = yield index_1.cart.getById(id);
        return res.json({ data: cartSelected.items });
    }
    catch (err) {
        return res.status(400).send({ err });
    }
});
exports.getItemsFromCart = getItemsFromCart;
const deleteCart = (res, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield index_1.cart.deleteById(id);
        return res.json({ data: `cart ${id} eliminada` });
    }
    catch (err) {
        return res.status(400).send({ err });
    }
});
exports.deleteCart = deleteCart;
const addItemsToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.id;
    const itemData = yield index_1.item.getById(req.params.idItem);
    const cartData = yield index_1.cart.getById(cartId);
    cartData.items.push(itemData);
    try {
        yield index_1.cart.updateById(cartId, { items: cartData.items });
        return res.json({ data: `${itemData._id} aniadido!` });
    }
    catch (err) {
        return res.status(400).send({ err });
    }
});
exports.addItemsToCart = addItemsToCart;
const deleteItemFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const idItem = req.params.idItem;
    const cartSelected = yield index_1.cart.getById(id);
    const filter = cartSelected.items.filter(x => x._id.valueOf() !== idItem);
    try {
        yield index_1.cart.updateById(id, { items: filter });
        return res.json({ data: `${idItem} eliminado` });
    }
    catch (err) {
        return res.status(400).send({ err });
    }
});
exports.deleteItemFromCart = deleteItemFromCart;
