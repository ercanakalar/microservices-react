'use client';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRequest } from '../../hooks/use-request';

const SignOut = () => {
  const router = useNavigate();

  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => router('/'),
  });

  useEffect(() => {
    const signout = async () => {
      await doRequest();
    };
    signout();
  }, [router]);

  return <div>log Out</div>;
};

export default SignOut;
