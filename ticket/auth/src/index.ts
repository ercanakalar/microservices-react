import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  console.log(process.env.JWT_KEY, 'jwt key');
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  } catch (error) {
    console.log(error, 'error connecting to db');
  }
};
// 192.168.49.2
app.listen(3000, () => {
  console.log('Listening on port 3000');
});

start();
