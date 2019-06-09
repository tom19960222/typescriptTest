"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class TendencyItem {
    constructor(options) {
        this.TId = lodash_1.default.toNumber(options.TId);
        this.category = lodash_1.default.toString(options.category);
        this.cNum = lodash_1.default.toNumber(options.cNum);
        this.SId = lodash_1.default.toNumber(options.SId);
    }
}
exports.TendencyItem = TendencyItem;
class TendencyInput {
    constructor(options) {
        this.category = lodash_1.default.toString(options.category);
        this.cNum = lodash_1.default.toNumber(options.cNum);
        this.SId = lodash_1.default.toNumber(options.SId);
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
    async getTendency(TId) {
        const row = await this.db('tendency').select().where('TId', TId);
        if (row.length === 0)
            return null;
        return new TendencyItem(row[0]);
    }
    async postTendency(req) {
        const data = new TendencyInput(req.body);
        const id = await this.db('tendency').insert(data).returning('TId');
        const row = await this.db('tendency').select().where('TId', id[0]);
        return new TendencyItem(row[0]);
    }
    async patchTendency(req) {
        const data = await this.db('tendency').select().where('TId', req.params.id);
        const input = {
            category: req.body.category || data[0].category,
            cNum: req.body.cNum || data[0].cNum,
            SId: req.body.SId || data[0].SId,
        };
        await this.db('tendency').update(input).where('TId', req.params.id);
        const row = await this.db('tendency').select().where('TId', req.params.id);
        return new TendencyItem(row[0]);
    }
    async deleteTendency(TId) {
        return await this.db('tendency').del().where('TId', TId);
    }
}
exports.TendencyAction = TendencyAction;
