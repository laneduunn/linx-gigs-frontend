//eslint-disable-next-line
//@ts-nocheck
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJobStore } from "@/store/jobs";
import { useAuthStore } from "@/store/auth";
import axios from "axios";
import { toast, Toaster } from "sonner";

const YourJobLists: React.FC = () => {
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  const { yourJobs, getYourJobs } = useJobStore();

  useEffect(() => {
    getYourJobs(user?.id, token);
  }, []);

  const navigateToPage = (id: number) => {
    const job = yourJobs?.filter((item) => item.id === id);

    navigate(`/jobs/${job[0].job_title + "-" + job[0].company.company_name}`, {
      state: { job: job[0] },
    });
  };

  const deleteJob = async (id: number) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/delete-job/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        const data = res.data;
        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };
  return (
    <div className="col-span-3">
      <Toaster />
      <h1 className="font-bold text-5xl">Your Jobs</h1>
      <div className="grid grid-cols-4 space-x-3 my-10">
        {yourJobs?.map((item) => {
          return (
            <div
              key={item?.id}
              className="p-4 rounded-md shadow-[#b1d0ff] shadow-xl bg-white"
            >
              <div className="flex gap-4 items-start">
                <img
                  src={item.company.image_url}
                  className="w-14 rounded-md"
                  alt={item.company.company_name}
                />
                <div className="flex flex-col">
                  <h1 className="font-bold text-secondary">
                    {item.company.company_name}
                  </h1>
                  <h1 className="text-zinc-400">
                    {item.company.company_address}
                  </h1>
                </div>
              </div>
              <h1 className="mt-5 text-2xl font-bold">{item?.job_title}</h1>
              <p className="text-sm text-zinc-400">
                Number of Applicants: {item?.applicants?.length}
              </p>
              <div className="flex justify-end gap-4 items-center mt-4">
                <button
                  onClick={() => navigateToPage(item?.id)}
                  className="bg-primary px-2 py-1 text-center text-white rounded-lg"
                >
                  View
                </button>
                <button
                  onClick={() => deleteJob(item?.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YourJobLists;
