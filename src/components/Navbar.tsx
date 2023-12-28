import React from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import links from "@/data/links.json";
import { useAuthStore } from "@/store/auth";
import { FaCircleUser } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";

const Navbar: React.FC = () => {
  const { user, setToken, setUser, token } = useAuthStore();

  const logout = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setToken("");
        setUser({
          id: 0,
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          is_employee: null,
        });
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="font-main pt-10 xxxxs: px-3 xxxs:px-5 xs:px-6 sm:px-8 md:px-10 lg:px-32">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <img src={logo} alt="Job-Finder" className="xxxxs:w-10 md:w-8" />
          <h1 className="font-bold text-2xl text-secondary">
            Linx <span className="text-primary">Gigs</span>
          </h1>
        </div>
        <div className="flex gap-x-4 items-center">
          {links.map((link, idx) => {
            return (
              <Link
                key={idx}
                to={link.path}
                className="text-secondary hover:text-primary duration-150 font-medium"
              >
                {link.name}
              </Link>
            );
          })}
          {!token && (
            <>
              <button className="border border-primary rounded-md px-3 py-1 font-bold text-primary">
                <Link to="/signup">Signup</Link>
              </button>
              <button className="bg-primary rounded-md px-3 py-1 font-bold text-white">
                <Link to="/login">Login</Link>
              </button>
            </>
          )}
          {user && user.is_employee ? (
            <button className=" rounded-md px-3 py-1">
              <Link to="/dashboard">Dashboard</Link>
            </button>
          ) : (
            user?.first_name &&
            user?.last_name && (
              <button className=" rounded-md px-3 py-1">
                <Link to="/my-applications">Applications</Link>
              </button>
            )
          )}

          {token && (
            <>
              <div className="flex gap-4 items-center py-2 pl-2 pr-3 bg-zinc-200 rounded-full">
                <FaCircleUser size={20} />
                {user?.first_name + " " + user?.last_name}
              </div>
              <button
                onClick={logout}
                className="bg-primary rounded-md px-3 py-1 font-bold text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
