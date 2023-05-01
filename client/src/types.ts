  type Post = {
    id?: string;
    title: string;
    body: string;
    author: string;
    permalink: string;
    tags: string[];
    comments: Comment[];
    date: string;
  }
  type Comment = {
    body: string;
    email: string;
    
  }
export type {Post}