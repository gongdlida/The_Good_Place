import { catalogStore } from '@/catalog/store';
import { useEffect } from 'react';
import Layout from '@/layout/Layout';
import { PrintCatalogs } from '@/catalog/catalogList/elements';
import { Spinner } from '@/components';
import { _initializeCatalogList } from '@/catalog/catalogList/container';

export const CatalogList = () => {
  const { catalogList, setCatalogList, pagination, filterOptions, setPagination } =
    catalogStore();

  useEffect(() => {
    _initializeCatalogList(pagination, setCatalogList, filterOptions);
    if (pagination.page > 1) {
      setPagination(1);
    }
  }, [filterOptions.category]);

  return (
    <Layout>
      <section id='catalog_list_board' className=''>
        {catalogList.list === null ? <Spinner /> : <PrintCatalogs />}
      </section>
    </Layout>
  );
};
