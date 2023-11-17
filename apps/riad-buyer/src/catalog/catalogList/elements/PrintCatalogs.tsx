import { catalogStore } from '@/catalog/store';
import useDidMountEffect from '@/hooks/useDidMountEffect';
import { updateByPagination } from '@/catalog/catalogList/container';

import { Card, Filter } from '@/catalog/catalogList/elements';
import Pagination from '@/components/pagination/Pagination';

export const PrintCatalogs = () => {
  const {
    setPrintList,
    catalogList,
    pagination,
    filterOptions,
    printList,
    isModalOpen,
    setPagination,
  } = catalogStore();

  useDidMountEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    updateByPagination(pagination, catalogList!, setPrintList);
  }, [pagination.page]);

  return (
    <article id='catalog_list' className='flex w-full flex-col items-center'>
      <Filter />
      <section
        className={`flex w-[1330px] flex-col items-center ${
          isModalOpen ? 'h-[calc(100vh-162px)] overflow-hidden' : ''
        }`}
      >
        <div className='flex grow flex-wrap gap-[30px] pt-[30px]'>
          {printList!.map((catalog) => {
            return <Card key={catalog.Id} catalog={catalog} />;
          })}
        </div>
        <Pagination
          total={catalogList!.length}
          page={pagination.page}
          limit={pagination.bundle}
          setParams={(page: number) => setPagination(page)}
        />
      </section>
    </article>
  );
};
