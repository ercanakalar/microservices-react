'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function PostCreate() {
  const [post, setPost] = useState({
    title: '',
  });

  const onChangeTitle = (e: any) => {
    e.preventDefault();
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: any) => {
    console.log(post);

    await axios.post('http://posts.com/posts/create', {
      post,
    });

    setPost({
      title: '',
    });
  };

  return (
    <div>
      <form className='flex flex-col gap-2' onSubmit={onSubmit}>
        <div className='flex flex-col'>
          <label>Title</label>
          <input
            value={post.title}
            name='title'
            type='text'
            onChange={(e) => onChangeTitle(e)}
            className='rounded-md border-2 outline-1'
          />
        </div>
        <button className='bg-gray-300 shadow-md rounded-md px-1 border-gray-500 max-w-min '>
          Submit
        </button>
      </form>
    </div>
  );
}
