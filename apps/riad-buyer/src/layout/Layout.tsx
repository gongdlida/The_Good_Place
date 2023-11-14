import { type ReactNode, Fragment } from 'react';
import { GNB } from '@/layout/elements/GNB';

interface ILayout {
  children?: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <Fragment>
      <GNB />
      <div className='pt-20'>{children}</div>
    </Fragment>
  );
};

export default Layout;
