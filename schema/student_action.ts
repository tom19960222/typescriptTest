import _ from 'lodash';
import Knex from 'knex';
import {
  ValidationError,
  NotFoundError,
  CustomError,
  GeneralError,
} from '../error';
// 沒用到的 import 要記得刪掉

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

export class StudentInput {
  public name: String;
  public birthday: Date;
  public department: String;
  public level: number;

  constructor(options: any) {
    this.name = _.toString(options.name);
    this.birthday = options.birthday;
    this.department = _.toString(options.department);
    this.level = _.toNumber(options.level);

    if (!_.isEmpty(this.name))
      throw new ValidationError('Name field cannot be blank!');
  }
}

export class StudentAction {
  public db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getStudents(): Promise<StudentItem[]> {
    try {
      const result = await this.db('student').select();
      return result.map(stu => new StudentItem(stu));
    } catch (err) {
      // 這裡檢查 error 是不是我們自訂的 error 類別，是的話就不用再包裝一次
      // 把 error 包裝成統一的形式可以讓 middleware 層處理錯誤的時候更好看

      // 其實在 middleware 層以外的地方大部分只需要 `throw err;` 讓上層來處理就好了
      // 但是這邊會有 error 不是我們自己定義的 error 類別的可能 (像是 knex 丟出來的 error)，所以要做檢查

      if (err instanceof CustomError) throw err;
      throw new GeneralError(err);
    }
  }

  // 變數命名風格盡量統一，要嘛都用 Sid，或是都用 student_id
  // 但是 API 用的欄位名稱和程式裡變數名稱命名風格不一定要一樣，我個人習慣欄位名稱用底線分隔 + 全小寫，變數用 camelcase
  async getStudent(studentId: number) {
    // 盡量避免 row 這種很通用的名字，盡量使用有意義的命名

    try {
      const studentQueryResult = await this.db('student')
        .where('student_id', studentId)
        .first();

      if (!studentQueryResult) throw new NotFoundError('Student not found');
      return new StudentItem(studentQueryResult);
    } catch (err) {
      if (err instanceof CustomError) throw err;
      throw new GeneralError(err);
    }
  }

  async postStudent(input: StudentInput) {
    try {
      const insertResult = await this.db('student')
        .insert(input)
        .returning('student_id');

      // 用 .first() 可以直接回傳第一個 row
      const student = await this.db('student')
        .where('student_id', insertResult[0])
        .first();
      return new StudentItem(student);
    } catch (err) {
      if (err instanceof CustomError) throw err;
      throw new GeneralError(err);
    }
  }

  async patchStudent(input: StudentInput, studentId: number) {
    try {
      const student = await this.db('student')
        .where('student_id', studentId)
        .first();
      console.log(student);
      if (!student) throw new NotFoundError('Student not found');

      const dataToUpdate = {
        name: input.name || student.name,
        birthday: input.birthday || student.birthday,
        department: input.department || student.department,
        level: input.level || student.level,
      };

      await this.db('student')
        .update(dataToUpdate)
        .where('student_id', studentId);
      const result = await this.db('student')
        .where('student_id', studentId)
        .first();
      return new StudentItem(result);
    } catch (err) {
      if (err instanceof CustomError) throw err;
      throw new GeneralError(err);
    }
  }

  async deleteStudent(studentId: number) {
    try {
      return this.db('student')
        .del()
        .where('student_id', studentId);
    } catch (err) {
      if (err instanceof CustomError) throw err;
      throw new GeneralError(err);
    }
  }
}
