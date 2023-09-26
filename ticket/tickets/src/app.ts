import express, { Express } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { NotFoundError } from '@eactickets/common/build/errors';
import { errorHandler } from '@eactickets/common/build/middlewares';

const app: Express = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
    expires: new Date(Date.now() + 60 * 60 * 1000),
  })
);

app.all('*', async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
