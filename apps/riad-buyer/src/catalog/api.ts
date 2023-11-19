import { HTTP } from '@/api/axiosConfig';

const URL = 'https://tmp-riad.s3.ap-northeast-2.amazonaws.com/dummy/catalogs.json';
export const getCatalogList = async () => {
  try {
    return await HTTP.get<TCatalogList>(URL);
  } catch (error) {
    console.error(error);
  }
};
