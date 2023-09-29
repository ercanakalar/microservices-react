import express, { Express } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { NotFoundError } from '@eactickets/common/build/errors';
import { errorHandler } from '@eactickets/common/build/middlewares';

import {
  currentUserRouter,
  singInRouter,
  signOutRouter,
  signUpRouter,
} from './routes';

const app: Express = express();

console.log(process.env.NODE_ENV !== 'test', 'process.env.NODE_ENV !== test');

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
    expires: new Date(Date.now() + 60 * 60 * 1000),
  })
);

app.use(signUpRouter);
app.use(singInRouter);
app.use(currentUserRouter);
app.use(signOutRouter);

app.all('*', async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
