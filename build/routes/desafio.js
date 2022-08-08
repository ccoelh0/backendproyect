"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calculo_1 = __importStar(require("../calculo"));
const child_process_1 = require("child_process");
let contador = 0;
const routerDesafio = express_1.default.Router();
routerDesafio.get('/info', (_, res) => res.send({
    os: process.platform,
    nodeVersion: process.version,
    memoria: process.memoryUsage(),
    id: process.pid,
    folder: process.cwd(),
    path: process.execPath,
    argv: process.argv
}));
routerDesafio.get('/contador', (req, res) => {
    contador++;
    res.send({ contador });
});
routerDesafio.get('/api/random', (req, res) => {
    const cant = req.query.cant !== undefined ? parseInt(req.query.cant, 10) : 100000000;
    (0, calculo_1.getCant)(cant);
    (0, calculo_1.default)();
    const forkeado = (0, child_process_1.fork)('/fork');
    forkeado.send('empezar');
    forkeado.on('message', (msj) => {
        if (msj === 'termine')
            res.send('Calculo terminado');
    });
});
const routerDesafioFork = routerDesafio;
exports.default = routerDesafioFork;
