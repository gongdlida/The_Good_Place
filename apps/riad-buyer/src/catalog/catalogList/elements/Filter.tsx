import { catalogStore } from '@/catalog/store';
import { CATEGORY_TYPE } from '@/catalog/constants';
import { ReactSVG } from 'react-svg';
import {
  firstLetterToUpper,
  updateFilteredOptions,
} from '@/catalog/catalogList/container';
import { FilterModal } from '@/catalog/catalogList/elements';

export const Filter = () => {
  const { setFilterOptions, setIsModalOpen, filterOptions } = catalogStore();

  return (
    <article className='border-grey-300 sticky top-[81px] z-30 flex w-full justify-center border-b-[1px] bg-white'>
      <FilterModal />
      <div className='flex gap-10 py-3'>
        {CATEGORY_TYPE.map((category) => {
          return (
            <button
              key={category}
              className='flex flex-col items-center'
              onClick={() =>
                updateFilteredOptions(filterOptions, setFilterOptions, {
                  key: 'category',
                  value: category as TFilterType['category'],
                })
              }
            >
              <ReactSVG
                src='/assets/icons/Home.svg'
                beforeInjection={(svg) =>
                  svg.setAttribute('class', 'w-8 h-8 fill-grey-400')
                }
              />
              <p className='text-S/Medium'>{firstLetterToUpper(category)}</p>
            </button>
          );
        })}
        <button className='flex items-center gap-2' onClick={() => setIsModalOpen(true)}>
          <ReactSVG src='/assets/icons/Filter.svg' />
          <p className='text-M/Medium'>Filters</p>
        </button>
      </div>
    </article>
  );
};
