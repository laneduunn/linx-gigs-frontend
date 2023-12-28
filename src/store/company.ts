import { create } from "zustand";

interface Company {
  id: number;
  image_url: string;
  company_name: string;
  company_address: string;
  employer_id: number;
}

interface CompanyStore {
  company: Company;
  getCompany: (id: number, token: string) => Promise<void>;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  company: {
    id: 0,
    image_url: "",
    company_name: "",
    company_address: "",
    employer_id: 0,
  },
  getCompany: async (id, token) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/company/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.status === 200) {
        set({ company: data.company });
      }
    } catch (err) {
      console.log(err);
    }
  },
}));
