'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Cookies } from 'react-cookie';
import nextCookie from 'next-cookies';

import { useRequest } from '@/hooks/use-request';

const LandingPage = () => {
  const router = useRouter();

  const cookies = new Cookies();
  console.log(cookies.getAll());

  const { update, data: session, status } = useSession();

  const [currentuser, setCurrentuser] = useState(null);

  const { doRequest, errors } = useRequest({
    url: '/api/users/currentuser',
    method: 'get',
    body: {},
    onSuccess: () => {
      router.push('/');
      router.refresh();
    },
  });

  useEffect(() => {
    setCurrentuser(null);
    const fetch = async () => {
      const response = await doRequest();

      setCurrentuser(response.currentUser);
    };

    fetch();
  }, [update, router, doRequest]);

  // ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser
  return (
    <>
      {status === 'authenticated' ? (
        <h1>You are Signed In </h1>
      ) : (
        <h1>You are NOT Sign In</h1>
      )}
    </>
  );
};

export default LandingPage;
