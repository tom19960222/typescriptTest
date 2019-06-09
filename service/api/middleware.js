"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const student_action_1 = require("../../schema/student_action");
const tendency_action_1 = require("../../schema/tendency_action");
const error_1 = __importDefault(require("./error"));
class Middleware {
    constructor(Student_action, Tendency_action) {
        this.student_action = Student_action;
        this.tendency_action = Tendency_action;
    }
    getStudents() {
        return async (req, res) => {
            const row = await this.student_action.getStudents();
            return res.status(200).json(row);
        };
    }
    getStudent() {
        return async (req, res) => {
            const row = await this.student_action.getStudent(lodash_1.default.toInteger(req.params.id));
            if (row === null)
                return res.status(404).json(error_1.default.not_found);
            return res.status(200).json(row);
        };
    }
    postStudent() {
        return async (req, res) => {
            if (req.body.name != null) {
                const rows = await this.student_action.postStudent(new student_action_1.StudentInput(req.body));
                return res.status(200).json(rows);
            }
            return res.status(200).json({ code: 200, message: 'Name field cannot be blank!' });
        };
    }
    patchStudent() {
        return async (req, res) => {
            const rows = await this.student_action.patchStudent(new student_action_1.StudentInput(req.body), lodash_1.default.toInteger(req.params.id));
            if (rows === null)
                return res.status(404).json(error_1.default.not_found);
            return res.status(200).json(rows);
        };
    }
    deleteStudent() {
        return async (req, res) => {
            const rows = await this.student_action.deleteStudent(req.params.id);
            if (rows === 0)
                return res.status(404).json(error_1.default.not_found);
            return res.status(200).json({ code: 200, message: 'Delete Ok' });
        };
    }
    getTendencys() {
        return async (req, res) => {
            const row = await this.tendency_action.getTendencys();
            return res.status(200).json(row);
        };
    }
    getTendency() {
        return async (req, res) => {
            const row = await this.tendency_action.getTendency(req.params.id);
            if (row === null)
                return res.status(404).json(error_1.default.not_found);
            return res.status(200).json(row);
        };
    }
    postTendency() {
        return async (req, res) => {
            const rows = await this.tendency_action.postTendency(new tendency_action_1.TendencyInput(req.body));
            return res.status(200).json(rows);
        };
    }
    patchTendency() {
        return async (req, res) => {
            const rows = await this.tendency_action.patchTendency(new tendency_action_1.TendencyInput(req.body), lodash_1.default.toInteger(req.params.id));
            if (rows === null)
                return res.status(404).json(error_1.default.not_found);
            return res.status(200).json(rows);
        };
    }
    deleteTendency() {
        return async (req, res) => {
            const rows = await this.tendency_action.deleteTendency(req.params.id);
            if (rows === 0)
                return res.status(404).json(error_1.default.not_found);
            return res.status(200).json({ code: 200, message: 'Delete Ok' });
        };
    }
}
exports.Middleware = Middleware;
