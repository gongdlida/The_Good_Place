import { catalogStore } from '@/catalog/store';
import { useEffect } from 'react';
import { updateByPagination } from '@/catalog/catalogList/container';

import { Card, Filter } from '@/catalog/catalogList/elements';

export const PrintCatalogs = () => {
  const { setPrintList, catalogList, pagination, option, printList, isModalOpen } =
    catalogStore();

  useEffect(() => {
    if (pagination.page > 1) {
      updateByPagination(pagination, catalogList!, setPrintList);
    }
  }, [option, pagination.page]);

  return (
    <article id='catalog_list' className='flex w-full flex-col items-center'>
      <Filter />
      <section
        className={`w-[1330px] ${
          isModalOpen ? 'h-[calc(100vh-162px)] overflow-hidden' : ''
        }`}
      >
        <div className='flex grow flex-wrap gap-[30px] pt-[30px]'>
          {printList!.map((catalog) => {
            return <Card key={catalog.Id} catalog={catalog} />;
          })}
        </div>
      </section>
    </article>
  );
};
//이미지, 호텔명, 상품명, 등급, 룸 타입, 가격
