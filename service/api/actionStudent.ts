import _ from 'lodash';
import Knex from 'knex';
import { Request } from 'express';

export class StudentItem {
  public student_id: number;
  public name: String;
  public birthday: Date;
  public department: String;
  public level: number;

  constructor(options: any) {
    this.student_id = options.student_id;
    this.name = options.name;
    this.birthday = options.birthday;
    this.department = options.department;
    this.level = options.level;
  }
}

export class StudentInput{
  public name: String;
  public birthday: Date;
  public department: String;
  public level: number;

  constructor(options: any) {
    this.name = _.toString(options.name);
    this.birthday = options.birthday;
    this.department = _.toString(options.department);
    this.level = _.toNumber(options.level);
  }
}

export class StudentAction{
  public db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getStudents() : Promise<StudentItem[]> {
    const result = await this.db('student').select();
    return result.map(stu => new StudentItem(stu));
  }
  
  async getStudent(Sid: number) {
    const row = await this.db('student').select().where('student_id', Sid);
    if(row.length === 0) return null;
    return new StudentItem(row[0]);
  }

  async postStudent(req: Request) {
    const data = new StudentInput(req.body);
    const id = await this.db('student').insert(data).returning('student_id');
    const row = await this.db('student').select().where('student_id', id[0]);
    return new StudentItem(row[0]);
  }

  async patchStudent(req: Request) {
    const data = await this.db('student').select().where('student_id', req.params.id);
    console.log(data);
    if(data.length === 0) return null;
    const input = {
      name: req.body.name || data[0].name,
      birthday: req.body.birthday || data[0].birthday,
      department: req.body.department || data[0].department,
      level: req.body.level || data[0].level,
    };
    await this.db('student').update(input).where('student_id', req.params.id);
    const result = await this.db('student').where('student_id', req.params.id);
    return new StudentItem(result[0]);
  }

  async deleteStudent(Sid: number) {
    return this.db('student').del().where('student_id', Sid);
  }


}