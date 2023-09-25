'use client';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useRequest } from '../../hooks/use-request';

const Header = () => {
  const [currentuser, setCurrentuser] = useState(null);

  const { doRequest, errors } = useRequest({
    url: '/api/users/currentuser',
    method: 'get',
    body: {},
  });

  useEffect(() => {
    setCurrentuser(null);
    const fetch = async () => {
      const response = await doRequest();

      setCurrentuser(response.currentUser);
    };
    fetch();
  }, []);

  return (
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
  );
};

export default Header;
