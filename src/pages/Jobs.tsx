/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navbar } from "@/components";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import JobList from "@/components/JobList";
import Footer from "@/components/Footer";
import { useJobStore } from "@/store/job";

const Jobs: React.FC = () => {
  const { searchJobs, jobs } = useJobStore();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  //This is the result that came from the landing page query
  const result = location.state;

  return (
    <>
      <Navbar />
      <div className="relative">
        <div
          className="mt-4 w-full h-40 object-fill bg-clip-content"
          style={{
            backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Dubai_Marina_Skyline.jpg/1200px-Dubai_Marina_Skyline.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="font-main h-screen py-4 xxxxs:px-3 xxxs:px-5 xs:px-6 sm:px-8 md:px-10 lg:px-32">
          <div className="flex items-center justify-center relative bottom-10">
            <input
              type="text"
              placeholder="Find Jobs from all around the world"
              className="w-[450px] py-4 pl-3 rounded-md border border-zinc-400"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={() => searchJobs(searchQuery)}
              className="bg-primary rounded-y-md rounded-r-md py-4 px-6 text-white font-bold flex items-center place-content-center gap-4"
            >
              <CiSearch className="text-bold" />
              Search
            </button>
          </div>
          {/* This is the result from the query in this page. */}
          {jobs && (
            <div className="flex flex-col justify-center items-center py-10">
              {!jobs.jobs ? (
                <h1 className="text-2xl font-bold text-center flex items-center gap-4">
                  No jobs found with{" "}
                  <span className="text-primary">{searchQuery}</span> keyword
                </h1>
              ) : (
                <div className="flex flex-col gap-4">
                  <h1>
                    {jobs.jobs.job.length} jobs found with{" "}
                    <span className="text-primary">{searchQuery}</span> keyword
                  </h1>
                  <div className="mt-4 flex flex-col gap-4">
                    {jobs.jobs.job.map((job: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex gap-4 items-center justify-center"
                      >
                        <h1 className="text-lg font-bold">{job.job_title}</h1>
                        <h1 className="text-lg font-bold">
                          {job.job_description}
                        </h1>
                        <h1 className="text-lg font-bold">{job.location}</h1>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {/* This is the search result that came from the landing page query */}
          {result && (
            <div className="flex flex-col justify-center items-center py-10">
              {!result.jobs ? (
                <h1 className="text-2xl font-bold text-center flex items-center gap-4">
                  No jobs found with{" "}
                  <span className="text-primary">{result.q}</span> keyword
                </h1>
              ) : (
                <div className="flex flex-col gap-4">
                  <h1>
                    {result.jobs.job.length} jobs found with{" "}
                    <span className="text-primary">{result.q}</span> keyword
                  </h1>
                  <div className="mt-4 flex flex-col gap-4">
                    {result.jobs.job.map((job: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex gap-4 items-center justify-center"
                      >
                        <h1 className="text-lg font-bold">{job.job_title}</h1>
                        <h1 className="text-lg font-bold">
                          {job.job_description}
                        </h1>
                        <h1 className="text-lg font-bold">{job.location}</h1>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <JobList title="Job List" />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Jobs;
