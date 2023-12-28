import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { Navbar } from "@/components";
import Company from "@/components/Company";
import YourJobLists from "@/components/YourJobLists";
import CreateJob from "@/components/CreateJob";

const Dashboard: React.FC = () => {
  const { token, user } = useAuthStore();

  if (!token && !user.is_employee) return <Navigate to="/jobs" />;
  return (
    <>
      <Navbar />
      <div className="font-main h-screen py-4 xxxxs: px-3 xxxs:px-5 xs:px-6 sm:px-8 md:px-10 lg:px-32">
        <div className="grid grid-cols-6 gap-x-10">
          <div className="col-span-3 flex flex-col gap-2 border-r border-zinc-300 pr-20">
            <Company />
            <CreateJob />
          </div>
          <YourJobLists />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
