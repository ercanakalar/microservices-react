import express, { Express } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import {
  currentUser,
  errorHandler,
} from '@eactickets/common/build/middlewares';
import { NotFoundError } from '@eactickets/common/build/errors';

import {
  createTicketRouter,
  allTicketRouter,
  getTicketRouter,
  updateTicketRouter,
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

app.use(currentUser);

app.use(createTicketRouter);
app.use(getTicketRouter);
app.use(allTicketRouter);
app.use(updateTicketRouter);

app.all('*', async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
