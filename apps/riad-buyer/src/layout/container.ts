import type { RefObject, Dispatch, SetStateAction } from 'react';

export const closeTagByMouseDown = (
  event: Event,
  isMeunOpen: boolean,
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>,
  ref: RefObject<HTMLDivElement>,
) => {
  if (isMeunOpen && ref.current && !ref.current?.contains(event.target as Node)) {
    setIsMenuOpen(false);
  }
};
