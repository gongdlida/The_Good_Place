import { catalogStore } from '@/catalog/store';
import { useEffect } from 'react';
import Layout from '@/layout/Layout';
import { PrintCatalogs } from '@/catalog/catalogList/elements';
import { Spinner } from '@/components';
import { _initializeCatalogList } from '@/catalog/catalogList/container';

export const CatalogList = () => {
  const {
    catalogList,
    setCatalogList,
    pagination,
    filterOptions,
    initializeCatalogList,
  } = catalogStore();
  // 캐싱되어야 하는 항목

  useEffect(() => {
    if (catalogList.list === null)
      _initializeCatalogList(pagination, setCatalogList, filterOptions);

    if (filterOptions.category === '') initializeCatalogList();
  }, [filterOptions.category]);

  return (
    <Layout>
      <section id='catalog_list_board' className=''>
        {catalogList.list === null ? <Spinner /> : <PrintCatalogs />}
      </section>
    </Layout>
  );
};
