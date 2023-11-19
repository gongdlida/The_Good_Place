import { create } from 'zustand';
import { INIT_FILTER_OPTIONS, INIT_PAGINATION } from '@/catalog/constants';

interface ICatalogStore {
  catalogList: TCatalogStatus;
  fetchStatus: TCatalogFetchStatus;
  pagination: TPagination;
  filterOptions: TFilterType;

  isModalOpen: boolean;
  setIsModalOpen: (param: boolean) => void;
  setPagination: (page: number) => void;
  setCatalogList: (params: TCatalogStatus) => void;
  setFilterOptions: (options: TFilterType) => void;
}
//  zustand slice pattern 사용하기 https://docs.pmnd.rs/zustand/guides/slices-pattern

export const catalogStore = create<ICatalogStore>((set, get) => ({
  catalogList: { list: null, printList: null },
  fetchStatus: { isLoading: false, error: null },
  printList: null,
  pagination: INIT_PAGINATION,
  setPagination: (page) => {
    const { pagination } = get();
    set({ pagination: Object.assign({}, pagination, { page }) });
  },
  filterOptions: INIT_FILTER_OPTIONS,

  isModalOpen: false,
  setIsModalOpen: (param) => set({ isModalOpen: param }),

  setFilterOptions: (newOptions) => set({ filterOptions: newOptions }),

  setCatalogList: (params) => set({ catalogList: params }),
  setFetchStatus: (status: TCatalogFetchStatus) => set({ fetchStatus: status }),
}));
