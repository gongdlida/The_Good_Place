import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface IModal {
  children: ReactNode;
  isOpen: boolean;
}

export const Modal = ({ isOpen, children }: IModal) => {
  return createPortal(
    isOpen ? (
      <div
        id='modal'
        className='fixed top-0 z-50 flex  h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-20 p-4 text-center md:inset-0 md:h-full'
      >
        {children}
      </div>
    ) : null,
    document.body,
  );
};
