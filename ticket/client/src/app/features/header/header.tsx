'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import { useRequest } from '@/app/hooks/use-request';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [userEmail, setUserEmail] = useState(null);

  const { doRequest, errors } = useRequest({
    url: '/api/users/currentuser',
    method: 'get',
    body: {},
  });

  useEffect(() => {
    setUserEmail(null);
    const currentUser = async () => {
      const res = await doRequest();

      console.log(res, 'res');

      setUserEmail(res.currentUser);
    };
    currentUser();
  }, []);

  console.log(userEmail, 'userEmail');

  return (
    <div className='flex flex-row justify-between p-3'>
      <div>
        <Link href='/'>GitTix</Link>
      </div>
      <div className='flex flex-row gap-2'>
        {!userEmail ? (
          <>
            <div>
              <Link href='/auth/signup'>Sign Up</Link>
            </div>
            <div>
              <Link href='/auth/signin'>Sign In</Link>
            </div>
          </>
        ) : (
          <div>
            <Link href='/auth/signout'>Sign Out</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;