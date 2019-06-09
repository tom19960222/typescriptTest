"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
class ApiService {
    constructor(app, db) {
        this.app = app;
        this.db = db;
    }
    setup() {
        new api_1.service(this.app, this.db);
    }
    ;
}
exports.ApiService = ApiService;
;
