'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { useRequest } from '@/hooks/use-request';

const Header = () => {
  const pathname = usePathname();
  const [currentuser, setCurrentuser] = useState(null);

  const { update, data: session, status } = useSession();

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
  }, [update, pathname]);

  return (
    <div className='flex flex-row justify-between p-3'>
      <div>
        <Link href='/'>GitTix</Link>
      </div>
      <div className='flex flex-row gap-2'>
        {status === 'unauthenticated' ? (
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
