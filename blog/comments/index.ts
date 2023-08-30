import express, { Express, Request, Response } from 'express';
import * as crypto from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId: any = {
  id: {
    id: '',
    title: '',
    comments: [
      {
        id: '',
        content: '',
        status: '',
      },
    ],
  },
};

app.get('/posts/:id/comments', (req: Request, res: Response) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req: Request, res: Response) => {
  const commentId: string = crypto.randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments: any = commentsByPostId[req.params.id] || [];
  comments.push({
    id: commentId,
    content,
    status: 'pending',
  });
  commentsByPostId[req.params.id] = comments;

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  });

  res.status(201).send(comments);
});

app.post('/events', async (req: Request, res: Response) => {
  console.log('Received Event', req.body.type);
  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;

    const comments: any = commentsByPostId[postId];

    const comment: any = comments.find((comment: any) => {
      return comment.id === id;
    });
    comment.status = status;

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on port 4001');
});
