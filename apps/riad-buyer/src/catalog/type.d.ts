type TCatalogInfo = {
  Id: string;
  productName: string;
  category: TCategory | '';
  roomType: TRoomType | '';
  grade: TGrade | 0;
  phone: string;
  email: string;
  address: string;
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

type TFilterType = {
  category: Pick<TCatalogInfo, 'category'> | '';
  grade: Pick<TCatalogInfo, 'grade'>[] | null;
  roomType: Pick<TCatalogInfo, 'roomType'>[] | null;
  price: { min: number; max: number };
};

type TCategory = 'pension' | 'hotel' | 'hostel' | 'apartment' | 'villa' | 'guesthouse';

type TGrade = 1 | 2 | 3 | 4 | 5;

type TRoomType = 'double' | 'standard' | 'tween' | 'single' | 'suite' | 'deluxe';
