'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { useRequest } from '@/hooks/use-request';

const LandingPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [currentuser, setCurrentuser] = useState(null);

  const { doRequest, errors } = useRequest({
    url: '/api/users/currentuser',
    method: 'get',
    body: {},
    onSuccess: () => router.push('/'),
  });

  useEffect(() => {
    setCurrentuser(null);
    const fetch = async () => {
      const response = await doRequest();

      setCurrentuser(response.currentUser);
    };
    fetch();
  }, []);

  // ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser
  return (
    <>
      {currentuser ? <h1>You are Signed In </h1> : <h1>You are NOT Sign In</h1>}
    </>
  );
};

export default LandingPage;
