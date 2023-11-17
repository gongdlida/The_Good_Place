import { catalogStore } from '@/catalog/store';
import { useEffect } from 'react';
import Layout from '@/layout/Layout';
import { PrintCatalogs } from '@/catalog/catalogList/elements';
import { Spinner } from '@/components';
import { _getCatalogList } from '@/catalog/catalogList/container';

export const CatalogList = () => {
  const { catalogList, setCatalogList, pagination, setPrintList, option } =
    catalogStore();
  // 캐싱되어야 하는 항목

  useEffect(() => {
    _getCatalogList(pagination, setCatalogList, setPrintList, option);
  }, [option.category]);

  return (
    <Layout>
      <section id='catalog_list_board' className=''>
        {catalogList === null ? <Spinner /> : <PrintCatalogs />}
      </section>
    </Layout>
  );
};
