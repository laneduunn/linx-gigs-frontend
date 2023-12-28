/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import axios from "axios";

interface ApplicationStore {
  applications: any[];
  getApplications: (id: number, token: string) => Promise<void>;
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  applications: [],
  getApplications: async (id: number, token) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/application/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.data;

      if (res.status !== 200) {
        set({ applications: [] });
        return;
      }

      set({ applications: data });
    } catch (err) {
      console.error(err);
    }
  },
}));
