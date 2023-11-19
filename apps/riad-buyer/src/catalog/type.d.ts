type TCatalogInfo = {
  Id: string;
  productName: string;
  category: TCategory | '';
  roomType: TRoomType | '';
  grade: TGrade | 0;
  phone: string;
  email: string;
  address: string;
  price: string | number;
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

type TFilterType = {
  category: Pick<TCatalogInfo, 'category'> | '';
  grade: Pick<TCatalogInfo, 'grade'>[] | null;
  roomType: Pick<TCatalogInfo, 'roomType'>[] | null;
  price: TPrice;
  priceRange: TPrice; // 기준
};

type TPrice = { min: number; max: number };

type TCategory = 'pension' | 'hotel' | 'hostel' | 'apartment' | 'villa' | 'guesthouse';

type TGrade = 1 | 2 | 3 | 4 | 5;

type TRoomType = 'double' | 'standard' | 'tween' | 'single' | 'suite' | 'deluxe';

type TCatalogStatus = {
  list: TCatalogList;
  printList: TCatalogList;
};

type TFilterType = Pick<TCatalogInfo, 'category' | 'grade' | 'roomType' | 'price'>;

type TCatalogDetail = {
  catalogInfo: TCatalogInfo | null;
  catalogList: TCatalogInfo[] | null;
};
