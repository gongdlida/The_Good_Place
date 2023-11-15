import { create } from 'zustand';
import { getCatalogList } from '@/catalog/api';

interface ICatalogStore {
  catalogList: TCatalogList[] | null;
  setCatalogList: () => void;
  fetchStatus: TCatalogFetchStatus;
}

export const catalogStore = create<ICatalogStore>((set) => ({
  catalogList: null,
  setCatalogList: async () => {
    const res = await getCatalogList();
    set({ catalogList: res?.data });
  },
  fetchStatus: { isLoading: false, error: null },
  setFetchStatus: (status: TCatalogFetchStatus) => set({ fetchStatus: status }),
}));
