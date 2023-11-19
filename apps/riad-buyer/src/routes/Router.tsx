import Home from '@/home/Home';

import Auth from '@/auth/Auth';
import { SignIn, SignUp } from '@/auth';

import { useRoutes } from 'react-router-dom';
import { PATH } from '@/routes/constants';

import { CatalogList } from '@/catalog/catalogList/CatalogList';
import { CatalogDetail } from '@/catalog/catalogDetail/CatalogDetail';
import ProtectedRoute from '@/components/ProtectRoute';

const Router = () => {
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
      element: (
        <ProtectedRoute>
          <CatalogList />
        </ProtectedRoute>
      ),
    },
    {
      path: PATH.CATALOG_DETAIL,
      element: (
        <ProtectedRoute>
          <CatalogDetail />
        </ProtectedRoute>
      ),
    },
  ]);
  return elements;
};

export default Router;
