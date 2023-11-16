import { create } from 'zustand';
import { getCatalogList } from '@/catalog/api';

interface ICatalogStore {
  catalogList: TCatalogList;
  setCatalogList: () => void;
  fetchStatus: TCatalogFetchStatus;

  printList: TCatalogList;
  setPrintList: (updatedList: TCatalogList) => void;

  pagination: TPagination;

  // option: TFilterType;
}
//  zustand slice pattern 사용하기 https://docs.pmnd.rs/zustand/guides/slices-pattern

export const catalogStore = create<ICatalogStore>((set, get) => ({
  catalogList: null,
  fetchStatus: { isLoading: false, error: null },
  printList: null,
  pagination: { bundle: 20, page: 1 },

  // 전체 카탈로그 데이터와 최초 출력될 카탈로그 printList를 업데이트
  setCatalogList: async () => {
    const {
      catalogList,
      pagination: { bundle },
    } = get();
    const res = await getCatalogList();

    set({ catalogList: res?.data });

    if (catalogList === null) {
      set({ printList: res?.data?.splice(0, bundle) });
    }
  },

  setFetchStatus: (status: TCatalogFetchStatus) => set({ fetchStatus: status }),

  setPrintList: (updatedList) => {
    set({ printList: updatedList });
  },
}));
