import { useMemo } from 'react';
// import reactLogo from './assets/react.svg';
import { Carousel } from '@/main/elements/Carousel';

import Layout from '@/layout/Layout';

function App() {
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

export default App;
