import _ from 'lodash';

import { StudentAction, StudentInput } from '../../schema/student_action';
import { TendencyAction, TendencyInput } from '../../schema/tendency_action';
import error from './error';
import { Response, Request } from 'express';

export class Middleware{
  public student_action: StudentAction;
  public tendency_action: TendencyAction;

  constructor(Student_action, Tendency_action) {
    this.student_action = Student_action;
    this.tendency_action = Tendency_action;
  }

  getStudents() {
    return async (req: Request, res: Response) => {
      const row = await this.student_action.getStudents();
      return res.status(200).json(row);
    }
  }

  getStudent() {
    return async (req: Request, res: Response) => {
      const row = await this.student_action.getStudent(_.toInteger(req.params.id));
      if(row === null) return res.status(404).json(error.not_found);
      return res.status(200).json(row);
    }
  }

  postStudent() {
    return async (req: Request, res: Response) => {
      if (req.body.name != null) {
        const rows = await this.student_action.postStudent(new StudentInput(req.body));
        return res.status(200).json(rows);
      }
      return res.status(200).json({ code: 200, message: 'Name field cannot be blank!'})
    }
  }

  patchStudent() {
    return async (req: Request, res: Response) => {
      const rows = await this.student_action.patchStudent(new StudentInput(req.body), _.toInteger(req.params.id));
      if(rows === null) return res.status(404).json(error.not_found);
      return res.status(200).json(rows);
    }
  }

  deleteStudent() {
    return async (req: Request, res: Response) => {
      const rows = await this.student_action.deleteStudent(req.params.id);
      if (rows === 0) return res.status(404).json(error.not_found);
      return res.status(200).json({ code: 200 , message: 'Delete Ok' });
    }
  }

  getTendencys() {
    return async (req, res: Response) => {
      const row = await this.tendency_action.getTendencys();
      return res.status(200).json(row);
    }
  }

  getTendency() {
    return async (req: Request, res: Response) => {
      const row = await this.tendency_action.getTendency(req.params.id);
      if(row === null) return res.status(404).json(error.not_found);
      return res.status(200).json(row);
    }
  }

  postTendency() {
    return async (req: Request, res: Response) => {
      const rows = await this.tendency_action.postTendency(new TendencyInput(req.body));
      return res.status(200).json(rows);
    }
  }

  patchTendency() {
    return async (req: Request, res: Response) => {
      const rows = await this.tendency_action.patchTendency(new TendencyInput(req.body), _.toInteger(req.params.id));
      if(rows === null) return res.status(404).json(error.not_found);
      return res.status(200).json(rows);
    }
  }

  deleteTendency() {
    return async (req: Request, res: Response) => {
      const rows = await this.tendency_action.deleteTendency(req.params.id);
      if (rows === 0) return res.status(404).json(error.not_found);
      return res.status(200).json({ code: 200 , message: 'Delete Ok' });
    }
  }

}