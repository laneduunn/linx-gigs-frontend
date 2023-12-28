//eslint-disable-next-line
//@ts-nocheck
import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { useCompanyStore } from "@/store/company";
import CreateCompany from "./CreateCompany";
import { FaLocationPin } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

import EditCompany from "./EditCompany";

const Company: React.FC = () => {
  const { company, getCompany } = useCompanyStore();
  const { user, token } = useAuthStore();
  const [isCreateCompany, setIsCreateCompany] = useState(false);
  const [isEditCompany, setIsEditCompany] = useState(false);

  useEffect(() => {
    getCompany(user?.id, token);
  }, [user?.id, token]);

  return (
    <div className="col-span-3 p-9">
      {company ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-zinc-400">Your company</h1>
            <div className="flex gap-4 items-center">
              <button onClick={() => setIsEditCompany(!isEditCompany)}>
                <FaEdit className="text-primary" size={30} />
              </button>
            </div>
          </div>
          <hr className="mt-2" />
          <div className="flex gap-4 items-center mt-4">
            <img className="w-24 rounded-full" src={company?.image_url} />
            <div className="flex flex-col">
              <h1 className="font-bold text-[60px] text-secondary">
                {company?.company_name}
              </h1>
              <h1 className="text-secondary font-semibold flex gap-5 items-center">
                <FaLocationPin />
                {company?.company_address}
              </h1>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[43px] font-bold text-secondary text-center leading-[40px] mb-4">
            You have not created a company yet
          </h1>
          <button
            onClick={() => setIsCreateCompany(!isCreateCompany)}
            className="border border-primary rounded-md px-3 py-1 font-bold text-primary"
          >
            Create Company
          </button>
        </div>
      )}
      <CreateCompany
        isCreateCompany={isCreateCompany}
        setIsCreateCompany={setIsCreateCompany}
      />
      <EditCompany
        companyId={company?.id}
        isEditCompany={isEditCompany}
        setIsEditCompany={setIsEditCompany}
      />
    </div>
  );
};

export default Company;
