'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRequest } from '../../hooks/use-request';
import FormInput from '../../components/input/form-input';
import SubmitButton from '../../components/button/submit-button';

const SignIn = () => {
  const router = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email: user.email, password: user.password },
    onSuccess: () => router('/'),
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
    <form
      className='flex flex-col md:px-24 px-6 gap-6'
      onSubmit={(event) => onSubmit(event)}
    >
      <div>
        <h1 className='flex justify-center text-2xl font-extrabold p-6'>
          Sign In
        </h1>
      </div>
      <div className='inline-grid gap-16'>
        <div className='flex justify-center w-full'>
          <FormInput
            id='email'
            type='email'
            placeholder='Enter Email'
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
            value={user.email}
          />
        </div>
        <div className='flex justify-center'>
          <FormInput
            type='password'
            id='password'
            placeholder='Enter Password'
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
            value={user.password}
          />
        </div>
      </div>
      <div>
        <ul>
          {errors?.length > 0 &&
            errors.map((error: { message: string }, index: number) => (
              <p key={index}>{error.message}</p>
            ))}
        </ul>
      </div>
      <div className='flex justify-end'>
        <SubmitButton type='submit'>
          <p className='text-white font-semibold w-'>Submit</p>
        </SubmitButton>
      </div>
    </form>
  );
};

export default SignIn;
