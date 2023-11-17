import { create } from 'zustand';

interface ICatalogStore {
  catalogList: TCatalogList;
  fetchStatus: TCatalogFetchStatus;
  printList: TCatalogList;
  pagination: TPagination;
  filterOptions: TFilterType;

  // modal handler
  isModalOpen: boolean;
  setIsModalOpen: (param: boolean) => void;
  setPagination: (page: number) => void;
  setCatalogList: (catalogList: TCatalogList) => void;
  setPrintList: (updatedList: TCatalogList) => void;
  setFilterOptions: (options: TFilterType) => void;
}
//  zustand slice pattern 사용하기 https://docs.pmnd.rs/zustand/guides/slices-pattern

export const catalogStore = create<ICatalogStore>((set, get) => ({
  catalogList: null,
  fetchStatus: { isLoading: false, error: null },
  printList: null,
  pagination: { bundle: 20, page: 1 },
  setPagination: (page) => {
    const { pagination } = get();
    set({ pagination: Object.assign({}, pagination, { page }) });
  },
  filterOptions: { category: '', grade: null, roomType: null, price: { min: 0, max: 0 } },

  isModalOpen: false,
  setIsModalOpen: (param) => set({ isModalOpen: param }),

  setFilterOptions: (newOptions) => set({ filterOptions: newOptions }),
  // 전체 카탈로그 데이터와 최초 출력될 카탈로그 printList를 업데이트
  setCatalogList: async (catalogList) => set({ catalogList }),

  setFetchStatus: (status: TCatalogFetchStatus) => set({ fetchStatus: status }),

  setPrintList: (updatedList) => set({ printList: updatedList }),
}));
