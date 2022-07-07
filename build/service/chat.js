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
exports.renderMessagesNorm = exports.saveMessage = exports.getAllMessage = void 0;
const index_1 = require("../daos/index");
const normalizr_1 = require("normalizr");
const getAllMessage = () => __awaiter(void 0, void 0, void 0, function* () { return yield index_1.chat.getAll(); });
exports.getAllMessage = getAllMessage;
const saveMessage = (message, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield index_1.chat.save(message);
        return res.send({ data: yield index_1.chat.getAll() });
    }
    catch (err) {
        return res.send({ err });
    }
});
exports.saveMessage = saveMessage;
const authorSchema = new normalizr_1.schema.Entity('authors');
const commentSchema = new normalizr_1.schema.Entity('messages');
const postSchema = new normalizr_1.schema.Entity('posts', {
    author: authorSchema,
    messages: [commentSchema]
});
const normMessage = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, exports.getAllMessage)();
    const messages = response.map(x => {
        return { id: x._id.valueOf(), author: x.author, message: x.message };
    });
    return { id: 'mangaecommerce', messages: messages };
});
const renderMessagesNorm = (res) => normMessage().then(response => res.send((0, normalizr_1.normalize)(response, postSchema)));
exports.renderMessagesNorm = renderMessagesNorm;
