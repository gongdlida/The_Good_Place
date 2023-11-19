import { getCatalogList } from '@/catalog/api';
import { PATH } from '@/routes/constants';
import { INIT_CATALOG_DETAIL } from '@/catalog/catalogDetail/constants';
import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';

export const getCatalogInfo = async (
  catalogId: string,
  setCatalogInfo: Dispatch<SetStateAction<TCatalogDetail>>,
  navigator: NavigateFunction,
) => {
  const catalogs = await getCatalogList();

  if (!catalogs || !catalogs.data) {
    //다시 시도해주세요.
    navigator(PATH.CATALOG_LIST);
    return setCatalogInfo(INIT_CATALOG_DETAIL);
  }

  const catalogInfo = catalogs.data.find((catalog) => catalog.Id === catalogId)!;

  if (catalogInfo === undefined) {
    //에러처리
    navigator(PATH.CATALOG_LIST);
    return;
  }

  const catalogList = catalogs.data
    .filter(
      (catalog) =>
        catalog.category === catalogInfo.category &&
        catalog.grade === catalogInfo.grade &&
        catalog.Id !== catalogInfo.Id,
    )
    .slice(0, 8);

  setCatalogInfo({ catalogInfo, catalogList });
};
