'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useRequest } from '@/app/hooks/use-request';

const SignOut = () => {
  const router = useRouter();

  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => router.push('/'),
  });

  useEffect(() => {
    const signout = async () => {
      await doRequest();
    };
    signout();
  }, []);

  return <div>Signing you out...</div>;
};

export default SignOut;
