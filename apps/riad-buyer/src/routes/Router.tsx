import Home from '@/home/Home';
import { useRoutes } from 'react-router-dom';

const Router = () => {
  const elements = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
  ]);
  return elements;
};

export default Router;
