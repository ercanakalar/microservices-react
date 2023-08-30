import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

const posts: any = {};
// posts = {
//   "123": {
//     id: "123",
//     title: "post title",
//     comments: [
//       {
//         id: "123",
//         content: "comment content",
//       },
//     ],
//   },
// };

const handleEvent = (type: string, data: any) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment: any = post.comments.find((comment: any) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', (req: Request, res: Response) => {
  res.send(posts);
});

app.post('/events', async (req: Request, res: Response) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002');
  try {
    const res = await axios.get('http://event-bus-srv:4005/events');

    for (let event of res.data) {
      console.log('Processing event:', event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error: any) {
    console.log(error.message);
  }
});
