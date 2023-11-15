import { useState } from 'react';
import { ReactSVG } from 'react-svg';

import { Sidebar } from '@/layout/elements';
import { Link } from 'react-router-dom';
import { PATH } from '@/routes/constants';

import { useSessionStorage } from '@/api/useSessionStorage';
import { CACHING_KEY } from '@/api/constants';
import isTruthy from '@/util/isTruthy';

export const GNB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useSessionStorage.getItem(CACHING_KEY.USER_INFO);

  return (
    <header className='border-grey-300 fixed top-0 z-10 w-full border-b-[1px] bg-white'>
      <Sidebar {...{ isOpen, setIsOpen }} />
      <nav className='m-auto flex w-full max-w-[1060px]  justify-between py-5'>
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

          <div className='absolute right-0'>
            {isTruthy(userInfo) ? (
              <button>
                <div className='flex flex-col'>
                  <div className='bg-grey-50 flex justify-center rounded-full border-[1px]'>
                    <ReactSVG
                      src='/assets/icons/Avartar.svg'
                      beforeInjection={(svg) => svg.setAttribute('class', 'w-8 h-8')}
                    />
                  </div>
                  <p>이준희</p>
                </div>
              </button>
            ) : (
              <div className='flex gap-5'>
                <Link to={PATH.SIGN_IN}>
                  <button
                    id='movedToSolution'
                    className='btn-xl-submit-outlined text-M/Bold border-grey-400 text-grey-700 rounded-lg px-5 py-[9px]'
                  >
                    로그인
                  </button>
                </Link>
                <Link to={PATH.SIGN_UP}>
                  <button
                    id='movedToSolution'
                    className='btn-xl-submit-outlined text-M/Bold rounded-lg px-5 py-[9px]'
                  >
                    회원가입
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
