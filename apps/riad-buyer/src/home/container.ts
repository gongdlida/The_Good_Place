import type { Dispatch, SetStateAction } from 'react';

export const handleImages = (
  setCurrentImage: Dispatch<SetStateAction<number>>,
  images: string[],
  type: 'next' | 'prev',
) => {
  type === 'next'
    ? setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    : setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
};
