import { useMemo } from 'react';
// import reactLogo from './assets/react.svg';
import { Carousel } from '@/home/elements/Carousel';

import Layout from '@/layout/Layout';

function Main() {
  const imgs = useMemo(
    () =>
      Array(4)
        .fill(0)
        .map((_, idx) => `/assets/imgs/${idx + 1}.png`),
    [],
  );
  return (
    <Layout>
      <Carousel images={imgs} />
    </Layout>
  );
}

export default Main;
