import type { Dispatch, SetStateAction, MouseEvent } from 'react';
import { getCatalogList } from '@/catalog/api';
import isTruthy from '@/util/isTruthy';

export const filledOption = (options: TFilterType) =>
  Object.entries(options).filter((option) => isTruthy(option[1]));

export const _getCatalogList = async (
  pagination: TPagination,
  setCatalogList: (catalogList: TCatalogList) => void,
  setPrintList: (updatedList: TCatalogList) => void,
  option: TFilterType,
) => {
  const res = await getCatalogList();

  const _option = filledOption(option);

  if (!res) return res; //에러

  let list = structuredClone(res.data);

  if (isTruthy(_option)) {
    list = filterCatalogList(option, res.data!);
  } else {
    setCatalogList(res.data);
  }

  setPrintList(list!.splice(0, pagination.bundle));
};

const filterCatalogList = (option: TFilterType, catalogList: TCatalogInfo[]) => {
  const _option = filledOption(option);
  if (isTruthy(_option) === false) return catalogList;

  const _catalogList = structuredClone(catalogList) as TCatalogInfo[];

  const { list } = [_catalogList].reduce(
    (pre: { list: TCatalogList; filter: any[] }, cur: TCatalogInfo[]) => {
      const { filter } = pre;
      const [key, value] = filter.pop() as keyof TFilterType;

      pre.list = cur.filter((catalog) => catalog[key as keyof TFilterType] === value);
      return pre;
    },
    { list: null, filter: _option },
  );

  return list;
};

export const firstLetterToUpper = (str: string) =>
  str.replace(str[0], str[0].toUpperCase());

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
