import React, { useState, useRef } from "react";
import { Navbar } from "@/components";
import { toast, Toaster } from "sonner";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { FaBusinessTime } from "react-icons/fa6";
import { BiSearch } from "react-icons/bi";
import Footer from "@/components/Footer";

const Signup: React.FC = () => {
  const [active, setActive] = useState("");
  const payload = useRef({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    is_employee: false,
  });

  const signup = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload.current),
      });
      const data = await res.json();

      if (res.status !== 200) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <div className="relative">
        <div className="font-main h-screen py-4 xxxxs: px-3 xxxs:px-5 xs:px-6 sm:px-8 md:px-10 lg:px-32">
          <div className="flex flex-col justify-center items-center">
            <div className="w-[400px] h-96 mt-32">
              {/* eslint-disable-next-line */}
              {/* @ts-ignore */}
              <form className="flex flex-col gap-4" onSubmit={signup}>
                <h1 className="text-2xl font-bold text-secondary text-center">
                  Create an account
                </h1>
                <div className="flex gap-2 items-center">
                  <TextField
                    autoFocus
                    id="outlined-input"
                    label="First Name"
                    type="text"
                    onChange={(e) => {
                      payload.current.first_name = e.target.value;
                    }}
                    autoComplete="current-email"
                  />
                  <TextField
                    id="outlined-input"
                    label="Last Name"
                    type="text"
                    onChange={(e) => {
                      payload.current.last_name = e.target.value;
                    }}
                    autoComplete="current-email"
                  />
                </div>
                <TextField
                  id="outlined-email-input"
                  label="Email"
                  type="email"
                  onChange={(e) => {
                    payload.current.email = e.target.value;
                  }}
                  autoComplete="current-email"
                />
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  onChange={(e) => {
                    payload.current.password = e.target.value;
                  }}
                  autoComplete="current-password"
                />
                <TextField
                  id="outlined-input"
                  label="Phone Number"
                  type="text"
                  onChange={(e) => {
                    payload.current.phone_number = e.target.value;
                  }}
                  autoComplete="current-password"
                />
                <div className="flex gap-2 items-center w-full">
                  <button
                    onClick={(e) => {
                      payload.current.is_employee = true;
                      setActive("employer");
                      e.preventDefault();
                    }}
                    className={`flex gap-4 place-content-center border border-primary text-primary p-4 rounded-md w-full ${
                      active === "employer" && "bg-primary text-white"
                    }`}
                  >
                    <FaBusinessTime className="text-2xl " />
                    Employer
                  </button>
                  <button
                    onClick={(e) => {
                      payload.current.is_employee = false;
                      setActive("jobseeker");
                      e.preventDefault();
                    }}
                    className={`flex gap-4 place-content-center border border-primary text-primary p-4 rounded-md w-full ${
                      active === "jobseeker" && "bg-primary text-white"
                    }`}
                  >
                    <BiSearch className="text-2xl " />
                    Job Seeker
                  </button>
                </div>
                <h1 className="text-sm text-zinc-500 text-center">
                  Already had an account?{" "}
                  <Link to="/login" className="italic underline">
                    Log in
                  </Link>
                </h1>

                <button
                  onClick={(e) => signup(e)}
                  className="bg-primary rounded-md py-2 px-4 text-white font-bold"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Signup;
