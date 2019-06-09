import { service } from './api';

export class ApiService{
  public app;
  public db;

  constructor(app, db) {
    this.app = app;
    this.db = db;
  }
  
   setup () {
    new service(this.app, this.db);
  };
};
