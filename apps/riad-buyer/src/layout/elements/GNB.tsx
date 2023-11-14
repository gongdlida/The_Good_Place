import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Sidebar } from '@/layout/elements';

export const GNB = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <Sidebar {...{ isOpen, setIsOpen }} />
      <div className='border-grey-500 fixed top-0 z-10 flex w-full justify-between border-b-[1px] bg-white px-20 py-5'>
        <div className='items-centerr relative flex w-full justify-center'>
          <button
            className='absolute left-0 h-10'
            onClick={() => {
              isOpen ? setIsOpen(false) : setIsOpen(true);
            }}
          >
            <ReactSVG src='/assets/icons/Menu.svg' />
          </button>

          <p className='text-3XL/Bold'>여기는 로고자리 입니다.</p>

          <div className='absolute right-0 flex gap-5'>
            {/* <button>
          <div className='flex flex-col'>
            <div className='bg-grey-50 flex justify-center rounded-full border-[1px]'>
              <ReactSVG
                src='/assets/icons/Avartar.svg'
                beforeInjection={(svg) => svg.setAttribute('class', 'w-8 h-8')}
              />
            </div>
            <p>이준희</p>
          </div>
        </button> */}
            <button
              id='movedToSolution'
              className='border-grey-400 text-M/Bold text-grey-800 rounded-lg border-[1px] px-5 py-[9px] sm:hidden'
              onClick={(event) => {}}
            >
              로그인
            </button>
            <button
              id='movedToSolution'
              className='text-M/Bold xs:text-S/Bold rounded-lg bg-orange-400 px-5 py-[9px] text-white'
              onClick={(event) => {}}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
