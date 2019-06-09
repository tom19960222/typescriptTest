"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class StudentItem {
    constructor(options) {
        this.student_id = options.student_id;
        this.name = options.name;
        this.birthday = options.birthday;
        this.department = options.department;
        this.level = options.level;
    }
}
exports.StudentItem = StudentItem;
class StudentInput {
    constructor(options) {
        this.name = lodash_1.default.toString(options.name);
        this.birthday = options.birthday;
        this.department = lodash_1.default.toString(options.department);
        this.level = lodash_1.default.toNumber(options.level);
    }
}
exports.StudentInput = StudentInput;
class StudentAction {
    constructor(db) {
        this.db = db;
    }
    async getStudents() {
        const result = await this.db('student').select();
        return result.map(stu => new StudentItem(stu));
    }
    async getStudent(Sid) {
        const row = await this.db('student').select().where('student_id', Sid);
        if (row.length === 0)
            return null;
        return new StudentItem(row[0]);
    }
    async postStudent(input) {
        const id = await this.db('student').insert(input).returning('student_id');
        const row = await this.db('student').select().where('student_id', id[0]);
        return new StudentItem(row[0]);
    }
    async patchStudent(stu, student_id) {
        const data = await this.db('student').select().where('student_id', student_id);
        console.log(data);
        if (data.length === 0)
            return null;
        const input = {
            name: stu.name || data[0].name,
            birthday: stu.birthday || data[0].birthday,
            department: stu.department || data[0].department,
            level: stu.level || data[0].level,
        };
        await this.db('student').update(input).where('student_id', student_id);
        const result = await this.db('student').where('student_id', student_id);
        return new StudentItem(result[0]);
    }
    async deleteStudent(Sid) {
        return this.db('student').del().where('student_id', Sid);
    }
}
exports.StudentAction = StudentAction;
