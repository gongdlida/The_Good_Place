import { AuthLayout } from '@/layout/AuthLayout';
import { PATH } from '@/routes/constants';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { convertPathToTitle } from '@/auth/container';
import { useMemo } from 'react';

const Auth = () => {
  const { pathname } = useLocation();

  const title = useMemo(
    () => convertPathToTitle(pathname as keyof typeof PATH),
    [pathname],
  );

  return (
    <AuthLayout>
      <div className='flex w-full flex-col items-center space-y-8'>
        <p className='text-3XL/Medium'>{title}</p>
        <Outlet />
        <Link className='absolute bottom-10' to={PATH.MAIN}>
          <p className='text-XL/Bold'>로고가 들어감</p>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Auth;
