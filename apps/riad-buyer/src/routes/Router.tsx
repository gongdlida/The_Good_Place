import Home from '@/home/Home';

import Auth from '@/auth/Auth';
import { SignIn, SignUp } from '@/auth';

import { useRoutes } from 'react-router-dom';
import { PATH } from '@/routes/constants';
import { useEffect } from 'react';
import { useSessionStorage } from '@/api/useSessionStorage';
import user_info from '@/auth/fixtures/user.account.json';
import { CACHING_KEY } from '@/api/constants';
import { CatalogList } from '@/catalog/catalogList/Catalog';
import { CatalogDetail } from '@/catalog/catalogDetail/CatalogDetail';

const Router = () => {
  useEffect(() => {
    // 로그인 구현을 위한 데이터 삽입
    useSessionStorage.setItem(CACHING_KEY.ALL_USERS, user_info);
  }, []);

  const elements = useRoutes([
    {
      path: PATH.MAIN,
      element: <Home />,
    },
    {
      path: PATH.MAIN,
      element: <Auth />,
      children: [
        { path: PATH.SIGN_IN, element: <SignIn /> },
        { path: PATH.SIGN_UP, element: <SignUp /> },
      ],
    },
    {
      path: PATH.CATALOG_LIST,
      element: <CatalogList />,
    },
    {
      path: PATH.CATALOG_DETAIL,
      element: <CatalogDetail />,
    },
  ]);
  return elements;
};

export default Router;
