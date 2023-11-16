import { catalogStore } from '@/catalog/store';
import { Fragment, useEffect } from 'react';
import { updateByPagination } from '@/catalog/catalogList/elements/container';
import { Card } from '@/catalog/catalogList/elements';

export const PrintCatalogs = () => {
  const { setPrintList, catalogList, pagination, printList } = catalogStore();

  useEffect(() => {
    // updateByPagination(pagination, catalogList!, setPrintList);
  }, []);

  return (
    <article id='catalog_list' className='flex w-full justify-center'>
      <section className='w-[1330px]'>
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
