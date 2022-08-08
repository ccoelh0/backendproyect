"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCant = void 0;
let cant;
const getCant = (number) => cant = number;
exports.getCant = getCant;
const calculoPesado = () => {
    for (let i = 0; i <= cant; i++) {
        const random = Math.round(Math.random() * (1000 - 1) + 1);
        const array = [];
        array.push(random);
        return array;
    }
    return false;
};
exports.default = calculoPesado;
