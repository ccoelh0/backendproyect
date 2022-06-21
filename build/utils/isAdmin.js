"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next, isAdmin = true) => isAdmin ? next() : res.json({ err: 'esta ruta no esta disponible para rol usuario!' });
exports.isAdmin = isAdmin;
