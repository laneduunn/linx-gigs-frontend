//eslint-disable-next-line
//@ts-nocheck
import React, { useState } from "react";
import { Navbar } from "@/components";
import Footer from "@/components/Footer";
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Typography,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import { styled } from "@mui/system";
import faqs from "@/data/faqs.json";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<IoIosArrowDown className="text-[25px]" />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",

  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const FAQs = () => {
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Navbar />
      <div className="font-main h-screen py-4 xxxxs: px-3 xxxs:px-5 xs:px-6 sm:px-8 md:px-10 lg:px-32">
        <div className="mt-10 flex flex-col justify-center items-center">
          <h1 className="font-bold text-5xl">
            FAQs or Frequently Asked Questions
          </h1>
          <div className="mt-4 w-[1000px]">
            {faqs.map((item, idx) => (
              <Accordion
                key={idx}
                expanded={expanded === `panel${idx}`}
                onChange={handleChange(`panel${idx}`)}
                sx={{
                  border: `1px solid ${(theme) => theme.palette.divider}`,
                  "&:not(:last-child)": {
                    borderBottom: 0,
                  },
                  "&::before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  aria-controls={`panel${idx}d-content`}
                  id={`panel${idx}d-header`}
                  sx={{
                    backgroundColor: "#35C8FF",
                    flexDirection: "row-reverse",
                    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                      transform: "rotate(90deg)",
                    },
                    "& .MuiAccordionSummary-content": {
                      marginLeft: (theme) => theme.spacing(1),
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "2xl",
                    }}
                  >
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: (theme) => theme.spacing(2),
                    borderTop: "1px solid rgba(0, 0, 0, .125)",
                    color: "text-zinc-400",
                    fontSize: "md",
                  }}
                >
                  <Typography>{item.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FAQs;
