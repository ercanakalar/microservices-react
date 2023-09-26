'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useRequest } from '@/hooks/use-request';

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
    router.refresh();
    router.push('/');
    signout();
  }, [router, doRequest]);

  return <div>log Out</div>;
};

export default SignOut;
