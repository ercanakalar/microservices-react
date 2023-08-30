'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './comment-create';
import CommentList from './comment-list';

export default function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://posts.com/posts');
    setPosts(res.data);
    console.log(res, 'res');
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post: any) => {
    return (
      <div className='flex justify-center border rounded-md' key={post.id}>
        <div className='flex flex-col'>
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className='grid grid-cols-3 gap-2 justify-between'>
      {renderedPosts}
    </div>
  );
}
