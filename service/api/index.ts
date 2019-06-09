import { Middleware } from './middleware';
import { StudentAction } from './actionStudent';
import { TendencyAction } from './actionTendency';

export class service {
  public app;
  public db;

  constructor(app, db) {
    this.app = app;
    this.db = db;

    const Student_action = new StudentAction(this.db);
    const Tendency_action = new TendencyAction(this.db);

    const middleware = new Middleware(Student_action, Tendency_action);
    
    this.app.get('/student', middleware.getStudents());
    this.app.get('/student/:id', middleware.getStudent());
    this.app.post('/student', middleware.postStudent());
    this.app.patch('/student/:id', middleware.patchStudent());
    this.app.delete('/student/:id', middleware.deleteStudent());

    this.app.get('/tendency', middleware.getTendencys());
    this.app.get('/tendency/:id', middleware.getTendency());
    this.app.post('/tendency', middleware.postTendency());
    this.app.patch('/tendency/:id', middleware.patchTendency());
    this.app.delete('/tendency/:id', middleware.deleteTendency());

  }
}