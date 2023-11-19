import { useEffect, useState, useRef } from 'react';
import { ReactSVG } from 'react-svg';

import { Sidebar } from '@/layout/elements';
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/constants';

import { useSessionStorage } from '@/api/useSessionStorage';
import { CACHING_KEY } from '@/api/constants';
import isTruthy from '@/util/isTruthy';
import { closeTagByMouseDown } from '@/layout/container';
export const GNB = () => {
  const navigator = useNavigate();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isOpenMenu, setisOpenMenu] = useState(false);
  const userInfo = useSessionStorage.getItem(CACHING_KEY.USER_INFO) as TUserInfo;
  const menubarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', (event) =>
      closeTagByMouseDown(event, isOpenMenu, setisOpenMenu, menubarRef),
    );
    return () => {
      document.removeEventListener('mousedown', (event) =>
        closeTagByMouseDown(event, isOpenMenu, setisOpenMenu, menubarRef),
      );
    };
  }, [isOpenMenu]);

  return (
    <header className='border-grey-300 fixed top-0 z-10 w-full border-b-[1px] bg-white'>
      <Sidebar {...{ isOpenSidebar, setIsOpenSidebar }} />
      <nav className='m-auto flex w-full max-w-[1330px]  justify-between py-5'>
        <div className='items-centerr relative flex w-full justify-center'>
          <button
            className='absolute left-0 h-10'
            onClick={() =>
              isOpenSidebar ? setIsOpenSidebar(false) : setIsOpenSidebar(true)
            }
          >
            <ReactSVG src='/assets/icons/Menu.svg' />
          </button>

          <Link to={PATH.MAIN}>
            <div className='flex items-center gap-1'>
              <ReactSVG
                src='/assets/icons/Location.svg'
                beforeInjection={(svg) =>
                  svg.setAttribute('class', 'fill-orange-300 w-8 h-8')
                }
              />
              <p className='text-3XL/Bold text-orange-400'>The Good Place</p>
            </div>
          </Link>

          <div className='absolute right-0'>
            {isOpenMenu && (
              <div
                ref={menubarRef}
                className='absolute right-0 top-[52px] z-30 w-[208px] rounded-lg bg-white shadow-[0px_2px_41px_rgba(0,0,0,0.1)]'
              >
                <ul className=''>
                  <li
                    className='text-S/Regular cursor-pointer px-4 py-3 text-red-700'
                    onClick={() => {
                      useSessionStorage.clearStorage();
                      setisOpenMenu(false);
                      navigator(PATH.MAIN);
                    }}
                  >
                    로그아웃
                  </li>
                </ul>
              </div>
            )}
            {isTruthy(userInfo) ? (
              <button
                onClick={() => (isOpenMenu ? setisOpenMenu(false) : setisOpenMenu(true))}
                className='border-grey-300 flex h-10 max-w-[200px] items-center rounded-lg border px-2'
              >
                <ReactSVG
                  src='/assets/icons/Smile.svg'
                  beforeInjection={(svg) =>
                    svg.setAttribute('class', 'w-7 h-7 fill-orange-300')
                  }
                />
                <p className='text-M/Medium text-grey-800 min-w-[70px] max-w-[150px] truncate'>
                  {userInfo.name}
                </p>
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
