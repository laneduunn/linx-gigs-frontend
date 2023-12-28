//eslint-disable-next-line
//@ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import logo from "@/assets/logo.png";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FaImage } from "react-icons/fa6";
import { styled } from "@mui/system";
import { toast, Toaster } from "sonner";
import { useAuthStore } from "@/store/auth";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateCompany: React.FC<{
  isCreateCompany: boolean;
  setIsCreateCompany: (isCreateCompany: boolean) => void;
}> = ({ isCreateCompany, setIsCreateCompany }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");

  const { user, token } = useAuthStore();
  const image = useRef(null);

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];

    //check the size of the image if its greater than 2mb
    if (file.size > 2 * 1024 * 1024) {
      toast.warning("Image size should be less than 2mb");
      return;
    }

    //get the actual data of the image
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_REACT_UPLOAD_PRESET);
    formData.append("cloud_name", import.meta.env.VITE_REACT_CLOUD_NAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_REACT_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log(data);
      image.current.src = data?.url;
    } catch (err) {
      console.log(err);
    }

    //upload the image file
  };

  const createCompany = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/company", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          company_name: companyName,
          company_address: companyAddress,
          image_url: image.current.src,
          employer_id: user?.id,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (res.status !== 200) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      {isCreateCompany && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="flex flex-col gap-4 p-10 w-5/12 bg-white absolute z-10 left-62 top-42 bg-blend-overlay shadow-2xl rounded-md l">
            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <img
                    src={logo}
                    alt="Job-Finder"
                    className="xxxxs:w-10 md:w-8"
                  />
                  <h1 className="font-bold text-2xl text-secondary">
                    Linx <span className="text-primary">Gigs</span>
                  </h1>
                </div>

                <h1 className="font-bold text-2xl">Add Company</h1>
                <button onClick={() => setIsCreateCompany(false)}>
                  <IoCloseCircleOutline size={35} />
                </button>
              </div>
              <form className="mt-10 w-full flex flex-col gap-4">
                <div className="flex justify-between">
                  <img
                    ref={image ?? null}
                    src=""
                    alt="company logo"
                    className="w-20 h-20 rounded-full object-cover"
                  />

                  <Button
                    component="label"
                    variant="contained"
                    //get file from input
                    onChange={(e) => uploadImage(e)}
                    startIcon={<FaImage />}
                  >
                    Upload Logo
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </div>
                <TextField
                  autoFocus
                  id="outlined-input"
                  label="Company Name"
                  type="text"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <TextField
                  id="outlined-input"
                  label="Company Address"
                  type="text"
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
                <button
                  onClick={(e) => createCompany(e)}
                  className="bg-primary w-full text-white py-3 rounded-md"
                >
                  Create Company
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCompany;
