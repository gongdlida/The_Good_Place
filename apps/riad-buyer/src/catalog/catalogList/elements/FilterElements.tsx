import { firstLetterToUpper } from '@/catalog/catalogList/container';
import type { ReactNode } from 'react';

interface ISelectButton {
  title: string;
  callback: Function;
  options: string[] | number[];
  target: any;
  icon?: ReactNode;
}

export const SelectButton = ({
  title,
  callback,
  options,
  target,
  icon,
}: ISelectButton) => {
  return (
    <section>
      <div className='flex flex-col px-6 py-8'>
        <p className='text-XL/Bold pb-6 text-start'>{title}</p>
        <ul className='flex gap-5 overflow-auto pb-5'>
          {options.map((option, index) => {
            const _selectedOption = Array.isArray(target) ? target : [target];
            const _option =
              typeof option === 'number' ? option : firstLetterToUpper(option);
            const activeButton = _selectedOption.includes(option)
              ? 'bg-grey-900 text-white'
              : 'bg-white text-grey-800';
            return (
              <li key={`category_type_${index}`}>
                <button
                  onClick={() => callback(option)}
                  className={`${
                    icon ? 'flex items-center justify-center gap-3' : ''
                  } border-grey-400 w-[110px] shrink-0 rounded-[30px] border py-4 ${activeButton}`}
                >
                  {icon}
                  <p className='text-S/Medium'>{_option}</p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
