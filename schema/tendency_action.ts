import Knex from 'knex';
import _ from 'lodash';
import { Request } from 'express';

export class TendencyItem{
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

export class TendencyInput{
  public category: String;
  public category_num: number;
  public student_id: number;

  constructor(options: any) {
    this.category = _.toString(options.category);
    this.category_num = _.toNumber(options.category_num);
    this.student_id = _.toNumber(options.student_id);
  }
}

export class TendencyAction{
  public db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getTendencys() {
    const row = await this.db('tendency').select();
    return row.map(r => new TendencyItem(r));
  }

  async getTendency(tendency_id: number) {
    const row = await this.db('tendency').select().where('tendency_id', tendency_id);
    if (row.length === 0) return null;
    return new TendencyItem(row[0]);
  }

  async postTendency(input: TendencyInput) {
    const id = await this.db('tendency').insert(input).returning('tendency_id');
    const row = await this.db('tendency').select().where('tendency_id', id[0]);
    return new TendencyItem(row[0]);
  }

  async patchTendency(ten: TendencyInput, id: number) {
    const data = await this.db('tendency').select().where('tendency_id', id);
    const input = {
      category: ten.category || data[0].category,
      category_num: ten.category_num || data[0].category_num,
      student_id: ten.student_id || data[0].student_id,
    }
    await this.db('tendency').update(input).where('tendency_id', id);
    const row = await this.db('tendency').select().where('tendency_id', id);
    return new TendencyItem(row[0]);
  }

  async deleteTendency(TId: number) {
    return await this.db('tendency').del().where('tendency_id', TId);
  }

}