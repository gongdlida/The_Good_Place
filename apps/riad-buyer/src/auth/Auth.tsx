import { AuthLayout } from '@/layout/AuthLayout';
import { PATH } from '@/routes/constants';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { convertPathToTitle } from '@/auth/container';
import { useMemo } from 'react';
import { ReactSVG } from 'react-svg';

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
        {[PATH.SIGN_IN].includes(pathname) && (
          <Link className='absolute bottom-10' to={PATH.MAIN}>
            <div className='flex items-center gap-1'>
              <ReactSVG
                src='/assets/icons/Location.svg'
                beforeInjection={(svg) =>
                  svg.setAttribute('class', 'w-6 h-6 fill-orange-500')
                }
              />
              <p className='text-XL/Bold text-orange-400'>The Good Place</p>
            </div>
          </Link>
        )}
      </div>
    </AuthLayout>
  );
};

export default Auth;
