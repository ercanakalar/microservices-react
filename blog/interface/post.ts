interface PostContent {
  id: string;
  title: string;
}

export interface Posts {
  [key: string]: PostContent;
}
