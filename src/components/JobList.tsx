//eslint-disable-next-line
//@ts-nocheck
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJobStore } from "@/store/jobs";

const JobList: React.FC<{ title: string }> = ({ title }) => {
  const navigate = useNavigate();
  const { jobs, getJobs } = useJobStore();

  const navigateToOtherPage = (id) => {
    const job = jobs?.filter((item) => item.id === id);

    navigate(`/jobs/${job[0].job_title + "-" + job[0].company.company_name}`, {
      state: { job: job[0] },
    });
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl">{title}</h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        {jobs?.map((job) => {
          return (
            <div
              className="p-4 rounded-2xl border border-zinc-300 bg-white"
              key={job?.id}
            >
              <div
                className="bg-[#8fd6ff] rounded-2xl p-4"
                style={{ height: "300px" }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <h1 className="bg-white px-4 py-2 rounded-full">
                      {new Date(job?.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h1>
                  </div>
                  <h1 className="font-semibold text-md mt-4">
                    {job?.company?.company_name}
                  </h1>
                  <div className="flex justify-between items-center">
                    <h1 className="text-3xl text-md font-extrabold">
                      {job?.job_title}
                    </h1>

                    <img
                      src={job?.company?.image_url}
                      className="w-10 rounded-full"
                      alt={job?.company?.name}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <h1 className="border border-[#5284a1] py-2 px-4 rounded-full text-[#1c3441] mt-9">
                      {job?.offered_position}
                    </h1>
                    <h1 className="border border-[#5284a1] py-2 px-4 rounded-full text-[#1c3441] mt-9">
                      {job?.alotted_capacity}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex flex-col">
                  <h1 className="font-semibold text-md">₱{job?.salary}/hr</h1>
                  <span className="text-zinc-400 text-sm">
                    {job?.company?.company_address}
                  </span>
                </div>
                <button
                  onClick={() => navigateToOtherPage(job?.id)}
                  className="font-bold text-white bg-secondary px-4 py-2 rounded-full"
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobList;
