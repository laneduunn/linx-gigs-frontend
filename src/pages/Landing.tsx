import React from "react";
import img from "@/assets/img.png";
import { Navbar, Search } from "@/components";
import Footer from "@/components/Footer";

const Landing: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="font-main py-4 xxxxs: px-3 xxxs:px-5 xs:px-6 sm:px-8 md:px-10 lg:px-32">
        <div className="grid grid-cols-6 gap-10 items-center place-items-center pt-24">
          <div className="col-span-3 flex flex-col gap-2 items-left">
            <h1 className="text-secondary font-bold text-[60px] leading-[80px]">
              Explore the best jobs you ever find!
            </h1>
            <p className="text-2xl text-zinc-500">
              We help the best job seekers secure their dream works in different
              quality companies from all around the world in no time.
            </p>
            <Search />
            <p className="text-sm text-zinc-800 font-bold mt-10">
              Supported by companies worldwide
            </p>
            <div className="flex gap-9 items-center">
              {[
                "https://cdn.pixabay.com/photo/2013/01/29/22/53/yahoo-76684_1280.png",
                "https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80658_1280.png",
              ]?.map((item, idx) => {
                return (
                  <img
                    key={idx}
                    src={item}
                    className="w-[100px] h-[100px] object-contain"
                  />
                );
              })}
            </div>
          </div>
          <img
            src={img}
            alt="Girl who's seeking a job"
            className="col-span-3 h-full w-full"
          />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Landing;
