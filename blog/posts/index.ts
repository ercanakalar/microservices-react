import express, { Express, Request, Response } from 'express';
import * as crypto from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

const posts: any = {};

app.get('/posts', (req: Request, res: Response) => {
  res.send(posts);
});

app.post('/posts/create', async (req: Request, res: Response) => {
  const id = crypto.randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post('/events', async (req: Request, res: Response) => {
  console.log('Received Event', req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log('v20');
  console.log('latest');
  console.log('first');
  console.log('Listening on port 4000');
});
