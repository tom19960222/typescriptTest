import _ from 'lodash';

import { StudentAction } from '../../Schema/actionStudent'
import { TendencyAction } from '../../Schema/actionTendency'
import { Response, Request } from 'express';

export class Middleware{
  public Student_action: StudentAction;
  public Tendency_action: TendencyAction;

  constructor(Student_action, Tendency_action) {
    this.Student_action = Student_action;
    this.Tendency_action = Tendency_action;
  }

  getStudents() {
    return async (req: Request, res: Response) => {
      const row = await this.Student_action.getStudents();
      return res.status(200).json(row);
    }
  }

  getStudent() {
    return async (req: Request, res: Response) => {
      const row = await this.Student_action.getStudent(req.params.id);
      if(row === null) return res.status(404).json({ code: 404, message: 'Not Found' });
      return res.status(200).json(row);
    }
  }

  postStudent() {
    return async (req: Request, res: Response) => {
      const rows = await this.Student_action.postStudent(req);
      return res.status(200).json(rows);
    }
  }

  patchStudent() {
    return async (req: Request, res: Response) => {
      const rows = await this.Student_action.patchStudent(req);
      if(rows === null) return res.status(404).json({ code: 404, message: 'Not Found' });
      return res.status(200).json(rows);
    }
  }

  deleteStudent() {
    return async (req: Request, res: Response) => {
      const rows = await this.Student_action.deleteStudent(req.params.id);
      if (rows === 0) return res.status(404).json({ code: 404, message: 'Not Found' });
      return res.status(200).json({ code: 200 , message: 'Delete Ok' });
    }
  }

  getTendencys() {
    return async (req, res: Response) => {
      const row = await this.Tendency_action.getTendencys();
      return res.status(200).json(row);
    }
  }

  getTendency() {
    return async (req: Request, res: Response) => {
      const row = await this.Tendency_action.getTendency(req.params.id);
      if(row === null) return res.status(404).json({ code: 404, message: 'Not Found' });
      return res.status(200).json(row);
    }
  }

  postTendency() {
    return async (req: Request, res: Response) => {
      const rows = await this.Tendency_action.postTendency(req);
      return res.status(200).json(rows);
    }
  }

  patchTendency() {
    return async (req: Request, res: Response) => {
      const rows = await this.Tendency_action.patchTendency(req);
      if(rows === null) return res.status(404).json({ code: 404, message: 'Not Found' });
      return res.status(200).json(rows);
    }
  }

  deleteTendency() {
    return async (req: Request, res: Response) => {
      const rows = await this.Tendency_action.deleteTendency(req.params.id);
      if (rows === 0) return res.status(404).json({ code: 404, message: 'Not Found' });
      return res.status(200).json({ code: 200 , message: 'Delete Ok' });
    }
  }

}