import { create } from "zustand";

//temporary attributes
interface Job {
  id: number;
  job_title: string;
  job_description: string;
  company: string;
  location: string;
  salary: number;
  type: string;
  experience: string;
  skills: string[];
  postedAt: string;
  created_at: string;
  updated_at: string;
}

type JobStore = {
  jobs: Job[];
  yourJobs: Job[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setJobs: (jobs: Job[]) => void;
  getJobs: () => Promise<void>;
  getYourJobs: (id: number, token: string) => Promise<void>;
  searchJob: (query: string) => Promise<void>;
};

export const useJobStore = create<JobStore>((set) => ({
  yourJobs: [],
  jobs: [],
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  setJobs: (jobs: Job[]) => set({ jobs }),

  getJobs: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/jobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jobs = await res.json();
      if (!jobs) {
        set({ jobs: [], loading: false });
        return;
      }

      set({ jobs: jobs.jobs, loading: false });
    } catch (err) {
      console.error(err);
    }
  },

  getYourJobs: async (id, token) => {
    set({ loading: true });
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/job/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}}`,
        },
      });

      const jobs = await res.json();
      if (!jobs) {
        set({ yourJobs: [], loading: false });
        return;
      }

      set({ yourJobs: jobs.jobs, loading: false });
    } catch (err) {
      console.error(err);
    }
  },

  searchJob: async (query: string) => {
    set({ loading: true });
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ job_title: query }),
      });

      const jobs = await res.json();

      if (!jobs) {
        set({ jobs: [], loading: false });
        return;
      }
      set({ jobs, loading: false });
    } catch (err) {
      console.error(err);
    }
  },
}));
