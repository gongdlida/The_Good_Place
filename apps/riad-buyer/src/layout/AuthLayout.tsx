import { Fragment, ReactNode } from 'react';

export interface IAuthLayout {
  children?: ReactNode;
}

export const AuthLayout = ({ children }: IAuthLayout) => {
  return (
    <Fragment>
      <div className='container h-screen bg-orange-100'>
        <div className='flex h-full flex-col items-center justify-center'>
          <div className='relative box-border w-full max-w-[536px] basis-[calc(100vh-112px-20px)] rounded-3xl bg-white px-[60px] py-[48px] pb-[32px] shadow-[0_0_16px_8px_rgba(0,0,0,0.02)]'>
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
