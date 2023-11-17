import { CATEGORY_TYPE } from '@/catalog/constants';
import { catalogStore } from '@/catalog/store';
import { updateFilteredOptions } from '@/catalog/catalogList/container';

export const Categories = () => {
  const { filterOptions, setFilterOptions } = catalogStore();

  return (
    <section>
      <div className='flex flex-col px-6 py-8'>
        <p className='text-XL/Bold pb-6 text-start'>Category Type</p>
        <ul className='flex gap-5 overflow-auto pb-5'>
          {CATEGORY_TYPE.map((category, index) => {
            const activeButton =
              filterOptions.category === category
                ? 'bg-grey-900 text-white'
                : 'bg-white text-grey-800';
            return (
              <li key={`category_type_${index}`}>
                <button
                  onClick={() =>
                    updateFilteredOptions(filterOptions, setFilterOptions, {
                      key: 'category',
                      value: category as TFilterType['category'],
                    })
                  }
                  className={`border-grey-400 w-[120px] shrink-0 rounded-[30px] border py-4 ${activeButton}`}
                >
                  <p className='text-L/Medium'>{category}</p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
