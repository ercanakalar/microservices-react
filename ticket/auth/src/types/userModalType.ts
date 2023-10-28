import mongoose from 'mongoose';

export interface UserAttrs {
  email: string;
  password: string;
}

export interface UserModal extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
