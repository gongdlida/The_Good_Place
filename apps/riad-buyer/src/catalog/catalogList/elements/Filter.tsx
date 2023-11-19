import { useEffect, useState } from 'react';
import { catalogStore } from '@/catalog/store';
import { CATEGORY_TYPE, INIT_FILTER_OPTIONS } from '@/catalog/constants';
import { ReactSVG } from 'react-svg';
import {
  firstLetterToUpper,
  filteredListByCategory,
  _initializeCatalogList,
} from '@/catalog/catalogList/container';
import { FilterModal } from '@/catalog/catalogList/elements';

export const Filter = () => {
  const [category, setCategory] = useState<'' | Pick<TCatalogInfo, 'category'>>('');
  const {
    setIsModalOpen,
    setCatalogList,
    pagination,
    setFilterOptions,
    setPagination,
    filterOptions,
  } = catalogStore();

  useEffect(() => {
    if (filterOptions.category !== '') setCategory(filterOptions.category);
  }, []);

  return (
    <article className='border-grey-300 sticky top-[81px] z-[1] flex w-full items-center justify-center border-b-[1px] bg-white'>
      <FilterModal />
      <div className='relative flex w-[1330px] justify-center gap-20 py-3'>
        {CATEGORY_TYPE.map((categoryList) => {
          const currnetCategory =
            category === categoryList
              ? { text: 'text-grey-800', svg: 'fill-grey-800' }
              : { text: 'text-grey-500', svg: 'fill-grey-500' };
          return (
            <button
              key={categoryList}
              className='flex flex-col items-center'
              onClick={() => {
                const value = categoryList as TFilterType['category'];
                window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                setCategory(value);
                setPagination(1);
                filteredListByCategory(value, setCatalogList);
              }}
            >
              <ReactSVG
                src='/assets/icons/Home.svg'
                beforeInjection={(svg) =>
                  svg.setAttribute('class', `w-8 h-8 ${currnetCategory.svg}`)
                }
              />
              <p className={`text-S/Medium ${currnetCategory.text}`}>
                {firstLetterToUpper(categoryList)}
              </p>
            </button>
          );
        })}

        <div className='absolute right-0 flex gap-5'>
          <button
            className='border-grey-400 flex items-center gap-2 rounded-2xl border p-3'
            onClick={() => setIsModalOpen(true)}
          >
            <ReactSVG src='/assets/icons/Filter.svg' />
            <p className='text-M/Medium text-grey-800'>Filters</p>
          </button>
          <button
            className='border-grey-400 flex items-center gap-2 rounded-2xl border p-3'
            onClick={() => {
              window.scroll({ top: 0, left: 0, behavior: 'smooth' });
              _initializeCatalogList(pagination, setCatalogList);
              setCategory('');
              setFilterOptions(INIT_FILTER_OPTIONS);
            }}
          >
            <ReactSVG src='/assets/icons/Redo.svg' />
            <p className='text-M/Medium text-grey-800'>Refresh</p>
          </button>
        </div>
      </div>
    </article>
  );
};
