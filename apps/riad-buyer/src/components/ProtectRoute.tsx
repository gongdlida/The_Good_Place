import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { CACHING_KEY } from '@/api/constants';
import { useSessionStorage } from '@/api/useSessionStorage';
import { PATH } from '@/routes/constants';

interface IProectRoute {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: IProectRoute) => {
  const user = useSessionStorage.getItem(CACHING_KEY.USER_INFO) !== null;
  if (user === false) {
    return <Navigate to={PATH.SIGN_IN} />;
  }
  return children;
};

export default ProtectedRoute;
