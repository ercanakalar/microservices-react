'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CommentCreate(props: { postId: string }) {
  const { postId } = props;
  const [content, setContent] = useState('');

  const onChangeContent = (e: any) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const onSubmit = async (e: any) => {
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });

    setContent('');
  };

  return (
    <div>
      <form className='flex flex-col gap-2' onSubmit={onSubmit}>
        <div className='flex flex-col'>
          <label>new Comment</label>
          <input
            value={content}
            type='text'
            onChange={(e) => onChangeContent(e)}
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
