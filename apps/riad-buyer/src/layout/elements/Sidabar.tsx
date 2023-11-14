import type { Dispatch, SetStateAction } from 'react';
import { ReactSVG } from 'react-svg';

interface ISidebar {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({ isOpen, setIsOpen }: ISidebar) => {
  return (
    <aside
      id='sidebar'
      style={{ animation: 'fade-right 0.5s ease-in' }}
      className={
        isOpen ? 'bg-grey-900 fixed left-0 z-30 h-full w-full bg-opacity-50' : 'hidden'
      }
    >
      <div className='relative h-full max-w-[430px] bg-white'>
        <header className='p-5'>
          <div className='relative flex h-10 w-full items-center justify-center'>
            <button className='absolute left-0' onClick={() => setIsOpen(false)}>
              <ReactSVG
                src='/assets/icons/Close.svg'
                beforeInjection={(svg) => {
                  svg.setAttribute('class', 'h-8 w-8 fill-grey-900');
                }}
              />
            </button>
            <p className='text-XL/Bold'>로고들어감</p>
          </div>
        </header>

        <footer className='absolute bottom-0'>
          <div className='flex flex-col'>
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
        </footer>
      </div>
    </aside>
  );
};
