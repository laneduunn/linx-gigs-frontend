import { create } from "zustand";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  is_employee?: boolean | null;
  created_at?: string;
  updated_at?: string;
}

type AuthStore = {
  token: string;
  user: User;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: "",

  user: {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    is_employee: null,
  },
  setUser: (user: User) => set({ user }),
  setToken: (token: string) => set({ token }),
}));
