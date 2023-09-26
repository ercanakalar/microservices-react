'use client';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useRequest } from '../../hooks/use-request';

const Header = ({ children }: { children: React.ReactNode }) => {
  const router = useNavigate();

  const [currentuser, setCurrentuser] = useState(null);

  const { doRequest } = useRequest({
    url: '/api/users/currentuser',
    method: 'get',
    body: {},
  });

  useEffect(() => {
    setCurrentuser(null);
    const fetch = async () => {
      const response = await doRequest();
      console.log(response, 'response');

      setCurrentuser(response.currentUser);
    };
    fetch();
  }, [router]);

  return (
    <>
      <div className='flex flex-row justify-between p-3'>
        <div>
          <Link to='/'>GitTix</Link>
        </div>
        <div className='flex flex-row gap-2'>
          {!currentuser ? (
            <>
              <div>
                <Link to='/auth/signup'>Sign Up</Link>
              </div>
              <div>
                <Link to='/auth/signin'>Sign In</Link>
              </div>
            </>
          ) : (
            <div>
              <Link to='/auth/signout'>Sign Out</Link>
            </div>
          )}
        </div>
      </div>
      {children}
    </>
  );
};

export default Header;
