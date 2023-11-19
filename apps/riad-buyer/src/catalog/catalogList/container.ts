import type { Dispatch, SetStateAction, MouseEvent } from 'react';
import { getCatalogList } from '@/catalog/api';
import { INIT_FILTER_OPTIONS } from '@/catalog/constants';
import isTruthy from '@/util/isTruthy';

export const filledOption = (options: TFilterType) =>
  Object.entries(options).filter((filterOptions) => {
    if (['priceRange'].includes(filterOptions[0])) return false;
    if (filterOptions[0] === 'price') {
      const { max } = filterOptions[1] as TPrice;
      return max !== 0;
    }
    return isTruthy(filterOptions[1]);
  });

export const _initializeCatalogList = async (
  pagination: TPagination,
  setCatalogList: (catalogList: TCatalogStatus) => void,
  filterOptions?: TFilterType,
) => {
  const res = await getCatalogList();

  const _option = filterOptions ? filledOption(filterOptions) : '';

  if (!res) return res; //에러
  const convertedList = convertFormatToNum(res.data!);
  const list = isTruthy(_option)
    ? filterCatalogList(filterOptions!, convertedList)
    : convertedList;

  setCatalogList({ list: list!, printList: list!.slice(0, pagination.bundle) });
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
  catalogList: TCatalogStatus,
  setCatalogList: (updatedList: TCatalogStatus) => void,
) => {
  const _catalogList = structuredClone(catalogList);
  const { page, bundle } = pagination;
  const from = (page - 1) * bundle;
  const to = bundle;

  const table = _catalogList.list!.splice(from, to);

  setCatalogList({ list: catalogList.list, printList: table });
};

const getUpdateFilteredOption = (
  filterOptions: TFilterType,
  newOption: { key: keyof TFilterType; value: TFilterType[keyof TFilterType] },
) => {
  const _ftOptions = structuredClone(filterOptions);
  const { key, value } = newOption;
  if (value === null) throw new Error('value는 null이 될 수 없음');

  switch (key) {
    case 'category': {
      _ftOptions.category = value as TFilterType['category'];
      break;
    }
    case 'grade': {
      //FIXME: 고쳐야함
      const _value = value as unknown as Pick<TCatalogInfo, 'grade'>;
      if (_ftOptions.grade === null) {
        _ftOptions.grade = [_value];
        break;
      }
      if (_ftOptions.grade.includes(_value)) {
        _ftOptions.grade = _ftOptions.grade.filter((grade) => grade !== _value);
        break;
      }
      _ftOptions.grade = _ftOptions.grade.concat(_value);
      break;
    }
    case 'price': {
      _ftOptions.price = value as TFilterType['price'];
      break;
    }
    case 'roomType': {
      //FIXME: 고쳐야함
      const _value = value as unknown as Pick<TCatalogInfo, 'roomType'>;
      if (_ftOptions.roomType === null) {
        _ftOptions.roomType = [_value];
        break;
      }
      if (_ftOptions.roomType.includes(_value)) {
        _ftOptions.roomType = _ftOptions.roomType.filter((grade) => grade !== _value);
        break;
      }
      _ftOptions.roomType = _ftOptions.roomType.concat(_value);
      break;
    }

    default:
      throw new Error('존재하지 않는 필터옵션 입니다.');
  }

  return _ftOptions;
};

const getPrice = (catalogs: TCatalogInfo[]) => {
  const prices = catalogs.map((catalog) => catalog.price) as number[];
  const [max, min] = [Math.max(...prices), Math.min(...prices)];
  return { max, min };
};

export const convertFormatToNum = (catalogList: TCatalogInfo[]) =>
  catalogList.map((catalog) => {
    const _price = catalog.price as string;
    catalog.price = parseInt(_price.replace(',', '').split('.')[0]);
    return catalog;
  });

export const _getCatalogList = async (
  _dispatch: Dispatch<SetStateAction<TCatalogStatus>>,
  setFilterOptions: (options: TFilterType) => void,
) => {
  const res = await getCatalogList();
  if (!res) return res; //에러
  const convertedList = convertFormatToNum(res.data!);

  _dispatch({ list: convertedList, printList: convertedList });
  const { max, min } = getPrice(convertedList!);
  INIT_FILTER_OPTIONS.priceRange = { max, min };
  setFilterOptions(INIT_FILTER_OPTIONS);
};

export const clearFilteredOptions = (
  _dispatch: Dispatch<SetStateAction<TCatalogStatus>>,
  setFilterOptions: (options: TFilterType) => void,
) => {
  _getCatalogList(_dispatch, setFilterOptions);
};

const filterCatalogList = (filterOptions: TFilterType, catalogList: TCatalogInfo[]) => {
  const _filtered = filledOption(filterOptions);
  if (isTruthy(_filtered) === false) return catalogList;

  const { list } = _filtered.reduce(
    (pre, cur) => {
      const [key, value] = cur;

      const _list = pre.list === null ? catalogList : pre.list;

      if (['roomType', 'grade'].includes(key)) {
        const _key = key as keyof TFilterType['roomType'] | keyof TFilterType['grade'];
        pre.list = _list.filter((catalog) => {
          const _value = value as
            | Pick<TCatalogInfo, 'grade'>[]
            | Pick<TCatalogInfo, 'roomType'>[];
          return _value.includes(catalog[_key]);
        });
      } else if (key === 'price') {
        const { min, max } = value as TPrice;

        pre.list = _list.filter((catalog) => {
          const price = catalog.price as number;
          return min <= price && max >= price;
        });
      } else {
        pre.list = _list.filter((catalog) => catalog.category === value);
      }

      return pre;
    },
    { list: catalogList },
  );
  return list;
};

export const updateFilteredOptions = (
  filterOptions: TFilterType,
  setFilterOptions: (options: TFilterType) => void,
  newOption: { key: keyof TFilterType; value: TFilterType[keyof TFilterType] },
  catalog?: TCatalogStatus,
  setCatalog?: Dispatch<SetStateAction<TCatalogStatus>>,
) => {
  const _option = getUpdateFilteredOption(filterOptions, newOption);
  setFilterOptions(_option);

  if (catalog && setCatalog) {
    const printList = filterCatalogList(_option, catalog!.list as TCatalogInfo[]);
    setCatalog({ list: catalog.list, printList });
  }
};

export const filteredListByCategory = async (
  category: TFilterType['category'],
  setCatalogList: (catalogList: TCatalogStatus) => void,
) => {
  const res = await getCatalogList();
  if (!res) return res; //에러

  const convertedList = convertFormatToNum(res.data!);
  const filteredList = convertedList.filter((catalog) => catalog.category === category);
  setCatalogList({
    list: filteredList,
    printList: filteredList.slice(0, 20),
  });
};
