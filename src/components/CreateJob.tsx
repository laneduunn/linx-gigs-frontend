/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import { useCompanyStore } from "@/store/company";
import { useAuthStore } from "@/store/auth";
import { toast, Toaster } from "sonner";
import axios from "axios";

const CreateJob: React.FC = () => {
  const { user, token } = useAuthStore();
  const { company, getCompany } = useCompanyStore();
  const payload = useRef({
    job_title: "",
    job_description: "",
    offered_position: "",
    qualifications: "",
    alloted_capacity: "",
    salary: "",
  });

  const createJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedQualifications = payload.current.qualifications.replace(
      /\n/g,
      "<br>"
    );

    const body = {
      job_title: payload.current.job_title,
      job_description: payload.current.job_description,
      offered_position: payload.current.offered_position,
      qualifications: formattedQualifications,
      alloted_capacity: parseInt(payload.current.alloted_capacity),
      salary: parseInt(payload.current.salary),
      employer_id: user?.id,
      company_id: company?.id,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create-job",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const data = response.data;
        console.log(data);

        if (data) {
          toast.success("Job created successfully");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCompany(user?.id, token);
  }, []);

  return (
    <div className="bg-white p-4 rounded-md w-full mt-4">
      <Toaster />
      <h1 className="font-bold text-2xl mb-4">Create Job</h1>
      <div className="flex flex-col gap-2">
        <TextField
          autoFocus
          id="outlined-input"
          label="Job Title"
          type="text"
          className="w-full"
          onChange={(e) => (payload.current.job_title = e.target.value)}
        />
        <textarea
          autoFocus
          placeholder="Job Description"
          className="w-full h-40 border border-zinc-300 rounded-md p-4"
          onChange={(e) => (payload.current.job_description = e.target.value)}
        />
        <div className="flex gap-4 w-full items-center">
          <TextField
            autoFocus
            id="outlined-input"
            label="Capacity"
            type="text"
            className="w-full"
            onChange={(e) =>
              (payload.current.alloted_capacity = e.target.value)
            }
          />
          <TextField
            autoFocus
            id="outlined-input"
            label="Job Salary"
            type="text"
            className="w-full"
            onChange={(e) => (payload.current.salary = e.target.value)}
          />
        </div>
        <TextField
          autoFocus
          id="outlined-input"
          label="Offered Position"
          type="text"
          className="w-full"
          onChange={(e) => (payload.current.offered_position = e.target.value)}
        />
        <textarea
          autoFocus
          placeholder="Job Qualifications"
          className="w-full h-40 border border-zinc-300 rounded-md p-4"
          onChange={(e) => (payload.current.qualifications = e.target.value)}
        />
        <button
          onClick={(e) => createJob(e)}
          className="mt-4 font-bold w-full text-center text-white py-2 bg-primary rounded-md"
        >
          Create Job
        </button>
      </div>
    </div>
  );
};

export default CreateJob;
