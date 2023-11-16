type TCatalogInfo = {
  Id: string;
  productName: string;
  category: string;
  grade: number;
  phone: string;
  email: string;
  address: string;
  roomType: string;
  price: string;
  currency: string;
  hotel: string;
  representativeImage: string;
  description: string;
  images: string[];
};

type TCatalogList = TCatalogInfo[] | null;

type TCatalogFetchStatus = {
  isLoading: boolean;
  error: string | null;
};

type TPagination = { bundle: number; page: number };

type TFilterType = Pick<TCatalogInfo, 'category' | 'grade' | 'roomType' | 'price'>;
