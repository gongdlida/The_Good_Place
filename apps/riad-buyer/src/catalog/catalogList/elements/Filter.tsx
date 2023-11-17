import { catalogStore } from '@/catalog/store';
import { CATEGORY_TYPE } from '@/catalog/constants';
import { ReactSVG } from 'react-svg';
import { firstLetterToUpper } from '@/catalog/catalogList/container';
import { FilterModal } from '@/catalog/catalogList/elements';

export const Filter = () => {
  const { setOption, setIsModalOpen } = catalogStore();

  return (
    <article className='border-grey-300 sticky top-[81px] z-30 flex w-full justify-center border-b-[1px] bg-white'>
      <FilterModal />
      <div className='flex gap-10 py-3'>
        {CATEGORY_TYPE.map((category) => {
          return (
            <button
              key={category}
              className='flex flex-col items-center'
              onClick={() => setOption('category', category)}
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
