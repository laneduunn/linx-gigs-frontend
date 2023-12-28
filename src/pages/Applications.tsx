/* eslint-disable react-hooks/rules-of-hooks */
//eslint-disable-next-line
//@ts-nocheck
import React, { useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { useApplicationStore } from "@/store/applications";
import { Navbar } from "@/components";
import { RxCountdownTimer } from "react-icons/rx";
import axios from "axios";
import { toast, Toaster } from "sonner";

const Applications: React.FC = () => {
  const { applications, getApplications } = useApplicationStore();
  const { user, token } = useAuthStore();

  if (!token) return <Navigate to="/login" />;

  const cancelApplication = async (id: number) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/application/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.data;
      if (res.status === 200) {
        toast.success(data.message);
        getApplications(user?.id, token);
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.error(err);
    }
  };

  useEffect(() => {
    getApplications(user?.id, token);
  }, []);
  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <div className="relative">
        <div className="font-main h-screen py-4 xxxxs: px-3 xxxs:px-5 xs:px-6 sm:px-8 md:px-10 lg:px-32">
          <div className="mt-10">
            <h1 className="font-bold text-4xl">My Applications</h1>
            {applications?.data?.length > 0 ? (
              <div className="flex flex-col gap-4 mt-4">
                {applications?.data?.map((application) => (
                  <div
                    key={application.id}
                    className="flex flex-col gap-2 border border-zinc-400 rounded-md p-4"
                  >
                    <div className="flex justify-between items-center bg-white p-8 rounded-md">
                      <div className="flex gap-4 items-center">
                        <img
                          className="w-24 rounded-full"
                          src={application.image_url}
                        />
                        <div className="flex flex-col">
                          <h1 className="font-bold text-zinc-500">
                            {application.company_name}
                          </h1>
                          <h1 className="text-[30px] text-secondary font-bold">
                            {application?.job_title}
                          </h1>
                          <h1 className="text-secondary font-semibold flex gap-5 items-center">
                            {application.company_address}
                          </h1>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        {application?.is_accepted === null && (
                          <>
                            <p className="flex gap-4 text-yellow-500 text-2xl items-center">
                              <RxCountdownTimer />
                              Pending
                            </p>
                            <button
                              onClick={() =>
                                cancelApplication(application?.applicant_id)
                              }
                              className="text-2xl font-bold bg-red-500 px-4 py-2 rounded-md text-white"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4 mt-4">
                <h1 className="text-2xl font-bold text-secondary">
                  You have not applied to any job yet
                </h1>
                <Link
                  to="/jobs"
                  className="border border-primary rounded-md px-3 py-1 font-bold text-primary"
                >
                  Browse Jobs
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Applications;
