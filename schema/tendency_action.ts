import Knex from 'knex';
import _ from 'lodash';
// 沒用到的 import 要記得刪掉

export class TendencyItem {
  public tendency_id: number;
  public category: String;
  public category_num: number;
  public student_id: number;

  constructor(options: any) {
    this.tendency_id = _.toNumber(options.tendency_id);
    this.category = _.toString(options.category);
    this.category_num = _.toNumber(options.category_num);
    this.student_id = _.toNumber(options.student_id);
  }
}

export class TendencyInput {
  public category: String;
  public category_num: number;
  public student_id: number;

  constructor(options: any) {
    this.category = _.toString(options.category);
    this.category_num = _.toNumber(options.category_num);
    this.student_id = _.toNumber(options.student_id);
  }
}

export class TendencyAction {
  public db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getTendencys() {
    const row = await this.db('tendency').select();
    return row.map(r => new TendencyItem(r));
  }

  // 這裡一樣變數名稱要統一，不要混用 `tendency_id`, `id`, `TId` 之類類似的命名
  async getTendency(tendencyId: number) {
    const tendency = await this.db('tendency')
      .where('tendency_id', tendencyId)
      .first();
    if (!tendency) return null;
    return new TendencyItem(tendency);
  }

  async postTendency(input: TendencyInput) {
    const insertResult = await this.db('tendency')
      .insert(input)
      .returning('tendency_id');
    const tendency = await this.db('tendency')
      .where('tendency_id', insertResult[0])
      .first();
    return new TendencyItem(tendency);
  }

  async patchTendency(input: TendencyInput, tendencyId: number) {
    const data = await this.db('tendency')
      .where('tendency_id', tendencyId)
      .first();
    const dataToUpdate = {
      category: input.category || data.category,
      category_num: input.category_num || data.category_num,
      student_id: input.student_id || data.student_id,
    };
    await this.db('tendency')
      .update(dataToUpdate)
      .where('tendency_id', tendencyId);
    const tendency = await this.db('tendency')
      .where('tendency_id', tendencyId)
      .first();
    return new TendencyItem(tendency);
  }

  async deleteTendency(tendencyId: number) {
    return await this.db('tendency')
      .del()
      .where('tendency_id', tendencyId);
  }
}
