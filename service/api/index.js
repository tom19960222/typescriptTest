"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("./middleware");
const actionStudent_1 = require("./actionStudent");
const actionTendency_1 = require("./actionTendency");
class service {
    constructor(app, db) {
        this.app = app;
        this.db = db;
        const Student_action = new actionStudent_1.StudentAction(this.db);
        const Tendency_action = new actionTendency_1.TendencyAction(this.db);
        const middleware = new middleware_1.Middleware(Student_action, Tendency_action);
        this.app.get('/student', middleware.getStudents());
        this.app.get('/student/:id', middleware.getStudent());
        this.app.post('/student', middleware.postStudent());
        this.app.patch('/student/:id', middleware.patchStudent());
        this.app.delete('/student/:id', middleware.deleteStudent());
        this.app.get('/tendency', middleware.getTendencys());
        this.app.get('/tendency/:id', middleware.getTendency());
        this.app.post('/tendency', middleware.postTendency());
        this.app.patch('/tendency/:id', middleware.patchTendency());
        this.app.delete('/tendency/:id', middleware.deleteTendency());
    }
}
exports.service = service;