import { create } from "zustand";
import axios from "axios";

type Data = {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
};

type Store = {
  loading: boolean;
  data: Data[] | null;
  error: string | null;
  fetchData: () => Promise<void>;
};

const useStore = create<Store>((set) => ({
  loading: true,
  data: null,
  error: null,

  fetchData: async () => {
    try {
      const response = await axios.get<Data[]>(
        "http://localhost:5000/api"
      );
      set({ data: response.data, loading: false, error: null });
    } catch (error: any) {
      set({ error: error.message, loading: false, data: null });
    }
  },
}));

export default useStore;
