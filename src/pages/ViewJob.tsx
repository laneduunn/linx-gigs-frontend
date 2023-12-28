//eslint-disable-next-line
//@ts-nocheck
import { Navbar } from "@/components";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import JobList from "@/components/JobList";
import { useAuthStore } from "@/store/auth";
import Footer from "@/components/Footer";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Applicants from "./Applicants";

const ViewJob: React.FC = () => {
  const { user, token } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const applyJob = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/application",
        {
          job_id: data?.job?.id,
          applicant_id: user?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.data;

      toast.success(result?.message);
    } catch (err) {
      toast.error(err.response.data.message);
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <div className="font-main h-screen w-full py-4 xxxxs: px-3 xxxs:px-5 xs:px-6 sm:px-8 md:px-10 lg:px-32">
        <div className="flex flex-col gap-5 mt-28 w-full pb-20">
          <div className="flex gap-14">
            <div className="">
              <div className="flex gap-4 items-center">
                <div className="flex flex-col">
                  <div className="flex gap-4 items-center">
                    <img
                      src={data?.job?.company?.image_url}
                      alt=""
                      className="w-24 rounded-full"
                    />
                    <div className="flex flex-col gap-2">
                      <h1 className="text-md text-zinc-400">
                        {data?.job?.offered_position}
                      </h1>
                      <h1 className="font-bold text-6xl">
                        {data?.job?.job_title}
                      </h1>
                      <div className="flex gap-4 text-md">
                        <h1 className="text-zinc-700">
                          {data?.job?.company?.company_name}
                        </h1>
                        <h1 className="text-zinc-700">
                          {data?.job?.company?.company_address}
                        </h1>
                        <h1 className="text-zinc-700">
                          {new Date(data?.job?.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </h1>
                      </div>
                    </div>
                    {!user?.is_employee && (
                      <button
                        onClick={applyJob}
                        className="font-bold text-white bg-primary px-6 py-4 rounded-full"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  <div className="flex gap-8 items-center mt-6">
                    <h1 className="text-lg text-zinc-400 border border-zinc-400 px-7 py-2 rounded-full">
                      ₱{data?.job?.salary}/hr
                    </h1>
                    <h1 className="text-lg text-zinc-400 border border-zinc-400 px-7 py-2 rounded-full">
                      {data?.job?.alotted_capacity} slots
                    </h1>
                  </div>

                  <div className="flex flex-col gap-6 pb-20 mt-10">
                    <h1 className="font-bold text-2xl">Job Description</h1>
                    <h1 className="">{data?.job.job_description}</h1>

                    <h1 className="font-bold text-2xl">Job Qualifications</h1>
                    <h1
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: data?.job.qualifications,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {user?.is_employee && data?.job?.employer_id === user?.id && (
              <Applicants />
            )}
          </div>
          <JobList title="Other Jobs" />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ViewJob;
