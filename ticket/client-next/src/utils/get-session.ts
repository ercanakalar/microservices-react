import { cookies } from 'next/headers';

export const getSession = () => {
  const cookieStorage = cookies().get('session');
  if (!cookieStorage) {
    return;
  }

  return cookieStorage;
};
