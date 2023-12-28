import React from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import links from "@/data/links.json";

const Footer: React.FC = () => {
  return (
    <div className="mt-40 flex justify-between items-start border-t border-zinc-400 pt-20">
      <div className="flex flex-col gap-1">
        <div className="flex gap-4 items-center">
          <img src={logo} alt="Job-Finder" className="xxxxs:w-10 md:w-8" />
          <h1 className="font-bold text-2xl text-secondary">
            Linx <span className="text-primary">Gigs</span>
          </h1>
        </div>
        <p className="text-zinc-400">All Rights Reserve 2023</p>
      </div>
      <div className="flex flex-col gap-2">
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
      </div>
    </div>
  );
};

export default Footer;
