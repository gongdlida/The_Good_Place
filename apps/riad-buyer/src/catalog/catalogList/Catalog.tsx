import { catalogStore } from '@/catalog/store';
import { useEffect } from 'react';
import Layout from '@/layout/Layout';
import { Card, PrintCatalogs } from '@/catalog/catalogList/elements';
import { SwitchCase, Spinner } from '@/components';

export const CatalogList = () => {
  const { catalogList, setCatalogList } = catalogStore();
  // 캐싱되어야 하는 항목

  useEffect(() => {
    setCatalogList();
  }, []);

  return (
    <Layout>
      <section id='catalog_list_board' className=''>
        {catalogList === null ? <Spinner /> : <PrintCatalogs />}
      </section>
    </Layout>
  );
};
