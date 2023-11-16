import { Dispatch, SetStateAction, MouseEvent } from 'react';

export const handleImages = (
  setCurrentImage: Dispatch<SetStateAction<number>>,
  images: string[],
  type: 'next' | 'prev',
  event: MouseEvent,
) => {
  event.stopPropagation();
  event.preventDefault();
  type === 'next'
    ? setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    : setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
};

export const updateByPagination = (
  pagination: TPagination,
  catalogList: TCatalogInfo[],
  setPrintList: (updatedList: TCatalogList) => void,
) => {
  const _catalogList = structuredClone(catalogList);
  const { page, bundle } = pagination;
  const from = (page - 1) * bundle;
  const to = bundle;

  const table = _catalogList.splice(from, to);
  setPrintList(table);
};
