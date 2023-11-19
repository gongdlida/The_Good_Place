import type { Dispatch, SetStateAction } from 'react';
import { ReactSVG } from 'react-svg';

interface ISidebar {
  isOpenSidebar: boolean;
  setIsOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({ isOpenSidebar, setIsOpenSidebar }: ISidebar) => {
  const animation = isOpenSidebar ? 'fade-right 0.5s ease-in' : 'fade-left 0.5s forwards';

  return (
    <aside
      id='sidebar'
      style={{ animation }}
      className={
        isOpenSidebar ? 'bg-grey-900 fixed left-0 z-30 h-full w-full bg-opacity-50' : ''
      }
    >
      {isOpenSidebar ? (
        <div className='relative h-full max-w-[430px] bg-white'>
          <header className='p-5'>
            <div className='relative flex h-10 w-full items-center justify-center'>
              <button className='absolute left-0' onClick={() => setIsOpenSidebar(false)}>
                <ReactSVG
                  src='/assets/icons/Close.svg'
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', 'h-6 w-6 fill-grey-900');
                  }}
                />
              </button>
              <p className='text-XL/Bold text-orange-400'>The Good Place</p>
            </div>
          </header>
        </div>
      ) : (
        <></>
      )}
    </aside>
  );
};
