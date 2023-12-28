import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useJobStore } from "@/store/jobs";

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState("");
  const { searchJob, jobs } = useJobStore();

  const search = () => {
    searchJob(job).then(() => {
      navigate("/jobs", { state: { jobs, q: job } });
    });
  };
  return (
    <div className="bg-white mt-12 p-10 rounded-xl grid grid-cols-5 gap-2 items-center shadow-[#c2c2c2] shadow-2xl">
      <input
        placeholder="Job Name"
        type="text"
        onChange={(e) => setJob(e.target.value)}
        className="border border-primary py-2 pl-4 rounded-md text-md col-span-4"
      />

      <button
        onClick={search}
        className="bg-primary rounded-md h-full text-white flex items-center place-content-center gap-4"
      >
        <CiSearch className="text-bold" />
        Search
      </button>
    </div>
  );
};

export default Search;
