export interface CommentContent {
  id?: string;
  content?: string;
  status?: string;
}

export interface PostContent {
  id?: string;
  title?: string;
  comments: CommentContent[];
}

export interface PostsWithComments {
  [key: string]: PostContent;
}
