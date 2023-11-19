import type { Dispatch, SetStateAction, MouseEvent } from 'react';
import { getCatalogList } from '@/catalog/api';
import { INIT_FILTER_OPTIONS } from '@/catalog/constants';
import isTruthy from '@/util/isTruthy';

export const filledOption = (options: TFilterType) =>
  Object.entries(options).filter((filterOptions) => {
    if (['priceRange', 'price'].includes(filterOptions[0])) return false;

    return isTruthy(filterOptions[1]);
  });

export const _initializeCatalogList = async (
  pagination: TPagination,
  setCatalogList: (catalogList: TCatalogStatus) => void,
  filterOptions: TFilterType,
) => {
  const res = await getCatalogList();
  const _option = filledOption(filterOptions);

  if (!res) return res; //에러

  const list = isTruthy(_option) ? filterCatalogList(filterOptions, res.data!) : res.data;

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
  const prices = catalogs.map((catalog) =>
    parseInt(catalog.price.replace(',', '').split('.')[0]),
  );
  const [max, min] = [Math.max(...prices), Math.min(...prices)];
  return { max, min };
};

export const _getCatalogList = async (
  _dispatch: Dispatch<SetStateAction<TCatalogStatus>>,
  setFilterOptions: (options: TFilterType) => void,
) => {
  const res = await getCatalogList();
  if (!res) return res; //에러
  _dispatch({ list: res.data, printList: res.data });
  const { max, min } = getPrice(res.data!);
  INIT_FILTER_OPTIONS.priceRange = { max, min };
  setFilterOptions(INIT_FILTER_OPTIONS);
};

export const clearFilteredOptions = (
  clearFilterOptions: Function,
  _dispatch: Dispatch<SetStateAction<TCatalogStatus>>,
  setFilterOptions: (options: TFilterType) => void,
) => {
  _getCatalogList(_dispatch, setFilterOptions);
  clearFilterOptions();
};

const filterCatalogList = (filterOptions: TFilterType, catalogList: TCatalogInfo[]) => {
  const _option = filledOption(filterOptions);
  if (isTruthy(_option) === false) return catalogList;

  const _catalogList = structuredClone(catalogList) as TCatalogInfo[];

  const { list } = [_catalogList].reduce(
    (pre: { list: TCatalogList; filter: any[] }, cur: TCatalogInfo[]) => {
      const [key, filteredKey] = pre.filter.pop() as keyof TFilterType;
      const _list = pre.list === null ? cur : pre.list;

      if (['grade', 'roomType'].includes(key)) {
        pre.list = _list!.filter((catalog) =>
          filteredKey.includes(catalog[key as keyof TCatalogInfo] as keyof TFilterType),
        );
      } else {
        pre.list = _list!.filter(
          (catalog) =>
            catalog[key as keyof Omit<TFilterType, 'priceRange'>] === filteredKey,
        );
      }

      return pre;
    },
    { list: null, filter: _option },
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
    const _list = newOption.key === 'category' ? catalog!.printList : catalog!.list;
    const printList = filterCatalogList(_option, _list as TCatalogInfo[]);
    setCatalog({ list: catalog.list, printList });
  }
};

export const filteredListByCategory = async (
  category: TFilterType['category'],
  setCatalogList: (catalogList: TCatalogStatus) => void,
) => {
  const res = await getCatalogList();
  if (!res) return res; //에러

  const filteredList = res.data!.filter((catalog) => catalog.category === category);
  setCatalogList({
    list: filteredList,
    printList: filteredList.slice(0, 20),
  });
};

// export const updateCatalogListByFilterOptions = (
//   filterOptions: TFilterType,
//   catalog: TCatalogStatus,
// ) => {
//   const Object.keys(filterOptions).filter((key) =>isTruthy(filterOptions[key as keyof TFilterType])
//   );
// };
