'use client';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRequest } from '../../hooks/use-request';

const LandingPage = () => {
  const router = useNavigate();

  const [currentuser, setCurrentuser] = useState(null);

  const { doRequest } = useRequest({
    url: '/api/users/currentuser',
    method: 'get',
    body: {},
    onSuccess: () => {
      router('/');
    },
  });

  useEffect(() => {
    setCurrentuser(null);
    const fetch = async () => {
      const response = await doRequest();

      setCurrentuser(response?.currentUser);
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
