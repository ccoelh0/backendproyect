"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContainerMongo_1 = __importDefault(require("../../containers/ContainerMongo"));
const SessionSchema_1 = __importDefault(require("../../models/SessionSchema"));
class SessionDao extends ContainerMongo_1.default {
    constructor() {
        super('user-sessions', SessionSchema_1.default);
    }
}
exports.default = SessionDao;
