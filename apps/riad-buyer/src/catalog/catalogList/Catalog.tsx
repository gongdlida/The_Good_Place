import { catalogStore } from '@/catalog/store';
import { useEffect } from 'react';
import Layout from '@/layout/Layout';

export const CatalogList = () => {
  const { catalogList, setCatalogList } = catalogStore();

  useEffect(() => {
    setCatalogList();
  }, []);

  return (
    <Layout>
      <></>
    </Layout>
  );
};
