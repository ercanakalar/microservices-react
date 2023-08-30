'use client';
import React from 'react';

export default function CommentList(props: { comments: string[] }) {
  const { comments } = props;

  const renderedPosts = comments.map((comment: any) => {
    let content;
    if (comment.status === 'approved') {
      content = comment.content;
    }
    if (comment.status === 'pending') {
      content = 'This comment is awaiting moderation';
    }
    if (comment.status === 'rejected') {
      content = 'This comment has been rejected!';
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul className='list-disc ml-4'>{renderedPosts}</ul>;
}
