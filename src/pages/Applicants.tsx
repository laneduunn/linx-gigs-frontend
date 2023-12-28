//eslint-disable-next-line
//@ts-nocheck
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { RxCountdownTimer } from "react-icons/rx";
import axios from "axios";
import { toast } from "sonner";

const Applicants: React.FC = () => {
  const { user } = useAuthStore();
  const [applicants, setApplicants] = useState([]);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/application/${user?.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = await res.data;
      setApplicants(data);
    } catch (err) {
      console.error(err);
    }
  };

  const acceptApplicant = async (id: number, method: string) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/application/${id}`,
        {
          method: method,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = await res.data;
      console.log(data);

      toast.success(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <div className="flex flex-col gap-4 pb-10">
      <h1 className="font-bold text-3xl">Applicants for this job</h1>
      <div className="max-h-[500px] overflow-y-auto flex flex-col gap-3">
        {applicants?.map((applicant) => {
          return (
            <div
              key={applicant?.id}
              className="bg-white rounded-lg p-4 shadow-2xl"
            >
              <div className="flex justify-between gap-24 items-center">
                <div className="flex gap-4 items-start">
                  <div className="rounded-md bg-primary py-6 px-8 font-bold text-white text-xl">
                    {applicant?.id}
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-bold text-xl">
                      {applicant?.user?.first_name +
                        " " +
                        applicant?.user?.last_name}
                    </h1>
                    <p>{applicant?.user?.email}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  {applicant?.is_accepted === null ? (
                    <>
                      <p className="flex gap-4 text-yellow-500 items-center">
                        <RxCountdownTimer />
                        Pending
                      </p>
                      <button
                        onClick={() => acceptApplicant(applicant?.id, "accept")}
                        className="bg-green-500 px-4 py-2 rounded-md text-white"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          acceptApplicant(applicant?.id, "decline")
                        }
                        className="bg-red-500 px-4 py-2 rounded-md text-white"
                      >
                        Decline
                      </button>
                    </>
                  ) : applicant?.is_accepted === true ? (
                    <p className="flex gap-4 text-green-500 items-center">
                      Accepted
                    </p>
                  ) : (
                    <p className="flex gap-4 text-red-500 items-center">
                      Declined
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Applicants;
