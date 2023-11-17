import type { Dispatch, SetStateAction, MouseEvent } from 'react';
import { getCatalogList } from '@/catalog/api';
import isTruthy from '@/util/isTruthy';

export const filledOption = (options: TFilterType) => [];
// Object.entries(options).filter((filterOptions) => isTruthy(filterOptions[1]));

export const _getCatalogList = async (
  pagination: TPagination,
  setCatalogList: (catalogList: TCatalogList) => void,
  setPrintList: (updatedList: TCatalogList) => void,
  filterOptions: TFilterType,
) => {
  const res = await getCatalogList();

  const _option = filledOption(filterOptions);

  if (!res) return res; //에러

  let list = structuredClone(res.data);

  if (isTruthy(_option)) {
    list = filterCatalogList(filterOptions, list!);
  } else {
    setCatalogList(res.data);
  }

  setPrintList(list!.splice(0, pagination.bundle));
};

const filterCatalogList = (filterOptions: TFilterType, catalogList: TCatalogInfo[]) => {
  const _option = filledOption(filterOptions);
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

export const updateFilteredOptions = (
  filterOptions: TFilterType,
  setFilterOptions: (options: TFilterType) => void,
  newOption: { key: keyof TFilterType; value: TFilterType[keyof TFilterType] },
) => {
  const _ftOptions = structuredClone(filterOptions);
  const { key, value } = newOption;

  switch (key) {
    case 'category': {
      _ftOptions.category = value as TFilterType['category'];
      break;
    }
    case 'grade': {
      _ftOptions.grade = value as TFilterType['grade'];
      break;
    }
    case 'price': {
      _ftOptions.price = value as TFilterType['price'];
      break;
    }
    case 'roomType': {
      _ftOptions.roomType = value as TFilterType['roomType'];
      break;
    }
    default:
      throw new Error('존재하지 않는 필터옵션 입니다.');
  }

  setFilterOptions(_ftOptions);
};
