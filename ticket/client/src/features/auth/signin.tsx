'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useRequest } from '@/hooks/use-request';

import Input from '@/components/input/input';

const SignIn = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email: user.email, password: user.password },
    onSuccess: () => router.push('/'),
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <form className='flex flex-col ' onSubmit={(event) => onSubmit(event)}>
      <h1>Sign In</h1>
      <div className='flex flex-col w-full '>
        <label htmlFor='email'>Email Address</label>
        <Input
          id='email'
          type='email'
          className='border-2 border-gray-300 outline-none'
          placeholder='Enter email'
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
          value={user.email}
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='password'>Password</label>
        <Input
          type='password'
          className='border-2 border-gray-300 outline-none'
          id='password'
          placeholder='Enter email'
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
          value={user.password}
        />
      </div>
      <div>
        <ul>
          {errors?.length > 0 &&
            errors.map((error: { message: string }, index: number) => (
              <p key={index}>{error.message}</p>
            ))}
        </ul>
      </div>
      <div className=''>
        <button type='submit' className=''>
          Submit
        </button>
      </div>
    </form>
  );
};

export default SignIn;
