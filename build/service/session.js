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
exports.logout = void 0;
const index_1 = require("../daos/index");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.use('createUser', new LocalStrategy((email, password, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const userdb = yield index_1.session.getAll();
    const isUserInDB = userdb.find(u => u.email === email);
    if (isUserInDB)
        return callback(new Error('user exists in bd'));
    try {
        const hash = bcrypt_1.default.hashSync(password.toString(), bcrypt_1.default.genSaltSync(10));
        const userSession = { email, password: hash };
        yield index_1.session.save(userSession);
        return callback(null, userSession);
    }
    catch (error) {
        return callback(error);
    }
})));
passport_1.default.use('validateLogin', new LocalStrategy((email, password, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const userdb = yield index_1.session.getAll();
    const user = userdb.find(u => u.email === email);
    if (!user || !(yield bcrypt_1.default.compare(password.toString(), user.password)))
        return callback(new Error('User or password incorrect'));
    callback(null, user);
})));
/*
  Candot engo que escribir una sesion, me pasan req.user y elijo
  que guardar en la sesion, en este caso es el username.
*/
passport_1.default.serializeUser((user, callback) => callback(null, user.email));
/*
  Cuando tengo que leer una sesion, agarro lo que esta en la sesion
  y decido como reconstruir req.user
*/
passport_1.default.deserializeUser((email, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const userdb = yield index_1.session.getAll();
    const user = userdb.find(user => user.email === email);
    callback(null, user);
}));
const logout = (req, res) => {
    req.session.destroy();
    return res.send({ data: true });
};
exports.logout = logout;
exports.default = passport_1.default;
