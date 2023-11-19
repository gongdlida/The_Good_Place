import { catalogStore } from '@/catalog/store';
import { CATEGORY_TYPE } from '@/catalog/constants';
import { ReactSVG } from 'react-svg';
import {
  firstLetterToUpper,
  updateFilteredOptions,
  filteredListByCategory,
} from '@/catalog/catalogList/container';
import { FilterModal } from '@/catalog/catalogList/elements';

export const Filter = () => {
  const { setFilterOptions, setIsModalOpen, filterOptions, setCatalogList } =
    catalogStore();

  return (
    <article className='border-grey-300 sticky top-[81px] z-[1] flex w-full justify-center border-b-[1px] bg-white'>
      <FilterModal />
      <div className='flex gap-20 py-3'>
        {CATEGORY_TYPE.map((category) => {
          const currnetCategory =
            filterOptions.category === category
              ? { text: 'text-grey-800', svg: 'fill-grey-800' }
              : { text: 'text-grey-500', svg: 'fill-grey-500' };
          return (
            <button
              key={category}
              className='flex flex-col items-center'
              onClick={() => {
                const value = category as TFilterType['category'];
                updateFilteredOptions(filterOptions, setFilterOptions, {
                  key: 'category',
                  value,
                });
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
                {firstLetterToUpper(category)}
              </p>
            </button>
          );
        })}
        <button
          className='border-grey-400 flex items-center gap-2 rounded-2xl border p-3'
          onClick={() => setIsModalOpen(true)}
        >
          <ReactSVG src='/assets/icons/Filter.svg' />
          <p className='text-M/Medium text-grey-800'>Filters</p>
        </button>
      </div>
    </article>
  );
};
