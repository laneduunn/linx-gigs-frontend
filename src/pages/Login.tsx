import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components";
import { useAuthStore } from "@/store/auth";
import { toast, Toaster } from "sonner";
import TextField from "@mui/material/TextField";
import Footer from "@/components/Footer";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();

    try {
      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status !== 200) {
        toast.error(data.message);
        return;
      }

      setUser(data.user);
      setToken(data.token);
      navigate("/jobs");
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
          <div className="flex flex-col items-center">
            <div className="w-[400px] h-96 mt-32">
              {/* eslint-disable-next-line */}
              {/* @ts-ignore */}
              <form className="flex flex-col gap-4" onSubmit={login}>
                <h1 className="text-2xl font-bold text-secondary text-center">
                  Login to your account
                </h1>

                <TextField
                  autoFocus
                  id="outlined-email-input"
                  label="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="current-email"
                />
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <h1 className="text-sm text-zinc-500 text-center">
                  Don't have an account yet?{" "}
                  <Link to="/signup" className="italic underline">
                    Sign up
                  </Link>
                </h1>
                <button
                  onClick={(e) => login(e)}
                  className="bg-primary rounded-md py-2 px-4 text-white font-bold"
                >
                  Login
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

export default Login;
