import Home from '@/home/Home';
import { SignIn, SignUp } from '@/auth';

import { useRoutes } from 'react-router-dom';
import { PATH } from '@/routes/constants';
import { useEffect } from 'react';
import { useSessionStorage } from '@/api/useSessionStorage';
import { URL } from '@/auth/signIn/api';
import user_info from '@/auth/fixtures/user.account.json';

const Router = () => {
  useEffect(() => {
    // 로그인 구현을 위한 데이터 삽입
    useSessionStorage.setItem(URL.SIGN_UP, user_info);
  }, []);

  const elements = useRoutes([
    {
      path: PATH.MAIN,
      element: <Home />,
    },
    {
      path: PATH.SIGN_IN,
      element: <SignIn />,
    },
    {
      path: PATH.SIGN_UP,
      element: <SignUp />,
    },
  ]);
  return elements;
};

export default Router;
