"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class TendencyItem {
    constructor(options) {
        this.tendency_id = lodash_1.default.toNumber(options.tendency_id);
        this.category = lodash_1.default.toString(options.category);
        this.category_num = lodash_1.default.toNumber(options.category_num);
        this.student_id = lodash_1.default.toNumber(options.student_id);
    }
}
exports.TendencyItem = TendencyItem;
class TendencyInput {
    constructor(options) {
        this.category = lodash_1.default.toString(options.category);
        this.category_num = lodash_1.default.toNumber(options.category_num);
        this.student_id = lodash_1.default.toNumber(options.student_id);
    }
}
exports.TendencyInput = TendencyInput;
class TendencyAction {
    constructor(db) {
        this.db = db;
    }
    async getTendencys() {
        const row = await this.db('tendency').select();
        return row.map(r => new TendencyItem(r));
    }
    async getTendency(tendency_id) {
        const row = await this.db('tendency').select().where('tendency_id', tendency_id);
        if (row.length === 0)
            return null;
        return new TendencyItem(row[0]);
    }
    async postTendency(input) {
        const id = await this.db('tendency').insert(input).returning('tendency_id');
        const row = await this.db('tendency').select().where('tendency_id', id[0]);
        return new TendencyItem(row[0]);
    }
    async patchTendency(ten, id) {
        const data = await this.db('tendency').select().where('tendency_id', id);
        const input = {
            category: ten.category || data[0].category,
            category_num: ten.category_num || data[0].category_num,
            student_id: ten.student_id || data[0].student_id,
        };
        await this.db('tendency').update(input).where('tendency_id', id);
        const row = await this.db('tendency').select().where('tendency_id', id);
        return new TendencyItem(row[0]);
    }
    async deleteTendency(TId) {
        return await this.db('tendency').del().where('tendency_id', TId);
    }
}
exports.TendencyAction = TendencyAction;
