import { create } from 'zustand';

interface ICatalogStore {
  catalogList: TCatalogList;
  fetchStatus: TCatalogFetchStatus;
  printList: TCatalogList;
  pagination: TPagination;
  option: TFilterType;

  // modal handler
  isModalOpen: boolean;
  setIsModalOpen: (param: boolean) => void;

  setCatalogList: (catalogList: TCatalogList) => void;
  setPrintList: (updatedList: TCatalogList) => void;
  setOption: (key: keyof TFilterType, value: TFilterType[keyof TFilterType]) => void;
}
//  zustand slice pattern 사용하기 https://docs.pmnd.rs/zustand/guides/slices-pattern

export const catalogStore = create<ICatalogStore>((set, get) => ({
  catalogList: null,
  fetchStatus: { isLoading: false, error: null },
  printList: null,
  pagination: { bundle: 20, page: 1 },
  option: { category: '', grade: 0, roomType: '', price: '' },

  isModalOpen: false,
  setIsModalOpen: (param) => set({ isModalOpen: param }),

  setOption: (key, value) => {
    const { option } = get();
    set({ option: Object.assign({}, option, { [key]: value }) });
  },
  // 전체 카탈로그 데이터와 최초 출력될 카탈로그 printList를 업데이트
  setCatalogList: async (catalogList) => set({ catalogList }),

  setFetchStatus: (status: TCatalogFetchStatus) => set({ fetchStatus: status }),

  setPrintList: (updatedList) => set({ printList: updatedList }),
}));
