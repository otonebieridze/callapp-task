import { create } from "zustand";
import axios from "axios";
import { DataItemInterface } from "../App";

interface UseStoreInterface {
  loading: boolean;
  storeData: DataItemInterface[] | null;
  error: string | null;
  fetchData: () => Promise<void>;
};

const useStore = create<UseStoreInterface>((set) => ({
  loading: true,
  storeData: null,
  error: null,

  fetchData: async () => {
    try {
      const response = await axios.get<DataItemInterface[]>(
        "http://localhost:5000/api/users"
      );
      set({ storeData: response.data, loading: false, error: null });
    } catch (error: any) {
      set({ error: error.message, loading: false, storeData: null });
    }
  },
}));

export default useStore;
