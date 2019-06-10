import _ from 'lodash';

import { StudentAction, StudentInput } from '../../schema/student_action';
import { TendencyAction, TendencyInput } from '../../schema/tendency_action';
import { Response, Request } from 'express';

export class Middleware {
  // 變數命名風格要統一
  public studentAction: StudentAction;
  public tendencyAction: TendencyAction;

  constructor(studentAction, tendencyAction) {
    this.studentAction = studentAction;
    this.tendencyAction = tendencyAction;
  }

  getStudents() {
    return async (req: Request, res: Response) => {
      // 在用非同步的 function 的時候要記得 try / catch
      // 其實在可能會有 error 的地方都要記得 try / catch，像是處理使用者輸入，或是有關網路的操作之類
      try {
        const students = await this.studentAction.getStudents();
        return res.status(200).json(students);
      } catch (err) {
        // 這裡改用了自己定義的 error class
        // 只要在 action 層裡面確保都是丟出自己定義的 error class，這邊就可以直接用下面的寫法，比較漂亮
        return res.status(err.code).json(err);
      }
    };
  }

  getStudent() {
    return async (req: Request, res: Response) => {
      try {
        const studentId = _.toInteger(req.params.id);
        const student = await this.studentAction.getStudent(studentId);
        return res.status(200).json(student);
      } catch (err) {
        return res.status(err.code).json(err);
      }
    };
  }

  postStudent() {
    return async (req: Request, res: Response) => {
      try {
        const student = await this.studentAction.postStudent(
          new StudentInput(req.body),
        );
        return res.status(201).json(student);
      } catch (err) {
        return res.status(err.code).json(err);
      }
    };
  }

  patchStudent() {
    return async (req: Request, res: Response) => {
      try {
        const studentId = _.toInteger(req.params.id);
        const student = await this.studentAction.patchStudent(
          new StudentInput(req.body),
          studentId,
        );
        return res.status(200).json(student);
      } catch (err) {
        return res.status(err.code).json(err);
      }
    };
  }

  deleteStudent() {
    return async (req: Request, res: Response) => {
      try {
        // 沒用到的變數宣告要砍掉
        await this.studentAction.deleteStudent(req.params.id);
        return res.status(200).json({ code: 200, message: 'Delete Ok' });
      } catch (err) {
        return res.status(err.code).json(err);
      }
    };
  }

  getTendencys() {
    return async (req, res: Response) => {
      try {
        const tendency = await this.tendencyAction.getTendencys();
        return res.status(200).json(tendency);
      } catch (err) {
        return res.status(err.code).json(err);
      }
    };
  }

  getTendency() {
    return async (req: Request, res: Response) => {
      try {
        const tendencyId = _.toInteger(req.params.id);
        const tendency = await this.tendencyAction.getTendency(tendencyId);
        return res.status(200).json(tendency);
      } catch (err) {
        return res.status(err.code).json(err);
      }
    };
  }

  postTendency() {
    return async (req: Request, res: Response) => {
      try {
        const tendency = await this.tendencyAction.postTendency(
          new TendencyInput(req.body),
        );
        return res.status(200).json(tendency);
      } catch (err) {
        return res.status(err).json(err);
      }
    };
  }

  patchTendency() {
    return async (req: Request, res: Response) => {
      try {
        const tendencyId = _.toInteger(req.params.id);
        const tendency = await this.tendencyAction.patchTendency(
          new TendencyInput(req.body),
          tendencyId,
        );
        return res.status(200).json(tendency);
      } catch (err) {
        return res.status(err.code).json(err);
      }
    };
  }

  deleteTendency() {
    return async (req: Request, res: Response) => {
      try {
        const tendencyId = _.toInteger(req.params.id);
        await this.tendencyAction.deleteTendency(tendencyId);
        return res.status(200).json({ code: 200, message: 'Delete Ok' });
      } catch (err) {
        return res.status(err.code).json(err);
      }
    };
  }
}
