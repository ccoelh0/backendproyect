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
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const config_1 = __importDefault(require("../utils/config"));
const serviceAccount = config_1.default.firebase;
firebase_admin_1.default.initializeApp({ credential: firebase_admin_1.default.credential.cert(serviceAccount) });
const db = firebase_admin_1.default.firestore();
class ContainerFirebase {
    constructor(collection) {
        this.collection = db.collection(collection);
    }
    save(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const guardado = yield this.collection.add(object);
            return Object.assign(Object.assign({}, object), { id: guardado.id });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            const data = yield this.collection.get();
            data.forEach(doc => result.push(Object.assign({ id: doc.id }, doc.data())));
            return result;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.collection.doc(id).get();
            if (!doc.exists) {
                throw new Error(`Error al listar por id: no se encontró`);
            }
            else {
                const data = doc.data();
                return Object.assign(Object.assign({}, data), { id });
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection.doc(id).delete();
        });
    }
    updateById(id, newElem) {
        return __awaiter(this, void 0, void 0, function* () {
            const actualizado = yield this.collection.doc(id).update({ items: newElem });
            return actualizado;
        });
    }
}
exports.default = ContainerFirebase;
