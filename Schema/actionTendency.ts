import Knex from 'knex';
import _ from 'lodash';
import { Request } from 'express';

export class TendencyItem{
  public TId: number;
  public category: String;
  public cNum: number;
  public SId: number;

  constructor(options: any) {
    this.TId = _.toNumber(options.TId);
    this.category = _.toString(options.category);
    this.cNum = _.toNumber(options.cNum);
    this.SId = _.toNumber(options.SId);
  }
}

export class TendencyInput{
  public category: String;
  public cNum: number;
  public SId: number;

  constructor(options: any) {
    this.category = _.toString(options.category);
    this.cNum = _.toNumber(options.cNum);
    this.SId = _.toNumber(options.SId);
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

  async getTendency(TId: number) {
    const row = await this.db('tendency').select().where('TId', TId);
    if (row.length === 0) return null;
    return new TendencyItem(row[0]);
  }

  async postTendency(req: Request) {
    const data = new TendencyInput(req.body);
    const id = await this.db('tendency').insert(data).returning('TId');
    const row = await this.db('tendency').select().where('TId', id[0]);
    return new TendencyItem(row[0]);
  }

  async patchTendency(req: Request) {
    const data = await this.db('tendency').select().where('TId', req.params.id);
    const input = {
      category: req.body.category || data[0].category,
      cNum: req.body.cNum || data[0].cNum,
      SId: req.body.SId || data[0].SId,
    }
    await this.db('tendency').update(input).where('TId', req.params.id);
    const row = await this.db('tendency').select().where('TId', req.params.id);
    return new TendencyItem(row[0]);
  }

  async deleteTendency(TId: number) {
    return await this.db('tendency').del().where('TId', TId);
  }

}