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

      setCurrentuser(response?.currentUser);
    };
    fetch();
  }, [router]);

  return (
    <>
      <div className='flex flex-row justify-between p-3 bg-gray-500'>
        <div>
          <Link to='/' className='text-lg font-bold'>GitTix</Link>
        </div>
          {!currentuser ? (
            <ul className='flex gap-2'>
              <li>
                <Link to='/signup' className='text-lg font-bold'>Sign Up</Link>
              </li>
              <li>
                <Link to='/signin' className='text-lg font-bold'>Sign In</Link>
              </li>
            </ul>
          ) : (
            <div>
              <Link to='/signout' className='text-lg font-bold'>Sign Out</Link>
            </div>
          )}
        </div>
      {children}
    </>
  );
};

export default Header;
