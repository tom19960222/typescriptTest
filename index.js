"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const knex_1 = __importDefault(require("knex"));
const config_1 = __importDefault(require("./config"));
const service_1 = require("./service");
const app = express_1.default();
const knex = knex_1.default(config_1.default);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
new service_1.ApiService(app, knex).setup();
app.listen('3000', () => {
    console.log('running');
});
