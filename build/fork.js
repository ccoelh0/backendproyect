"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const calculo_1 = __importDefault(require("./calculo"));
process.on('message', (msj) => {
    if (msj === 'empezar') {
        (0, calculo_1.default)();
        process.send && process.send('termine');
    }
});
