import Express from 'express';
import bodyParser from 'body-parser';
import Knex from 'knex';

import db from './config';
import { ApiService } from './service';

const app = Express();

const knex = Knex(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

new ApiService(app, knex).setup();

app.listen('3000', () => {
  console.log('running');
});
