import express, { Express } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cors from 'cors';
import cookieSession from 'cookie-session';

import { errorHandler } from './middlewares';
import { NotFoundError } from './errors';
import {
  currentUserRouter,
  singInRouter,
  signOutRouter,
  signUpRouter,
} from './routes';

const app: Express = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
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
