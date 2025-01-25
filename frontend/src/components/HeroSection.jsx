// import React from "react";
import { useTranslation } from "react-i18next";
// import { Search } from "lucide-react";
// import { Button } from "./ui/button";
// import CategoryCarousel from "./CategoryCarousel";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// // import { setSearchedQuery } from "@/redux/jobSlice";
// import { useNavigate } from "react-router-dom";

function HeroSection() {
  // const [query, setQuery] = useState("");
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { t } = useTranslation();

  // const searchJobHandler = () => {
  //   dispatch(setSearchedQuery(query));
  //   navigate("/browse");
  // }

  return (
    <section
      id="#home"
      className="relative flex flex-col-reverse lg:flex-row gap-5 items-center border-collapse justify-between bg-white p-4 lg:p-12"
    >
      {/* Left Side Content */}
      <div className="w-full lg:w-1/2 flex flex-col gap-5 my-10 text-center lg:text-left">
        <span className="mx-auto lg:mx-0 px-3 py-2 rounded-full bg-gray-100 text-[#4273a1] font-medium">
          {t("ultimateSolution")}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-normal">
          {t("getAFullTime")}{" "}
          <span className="text-[#45cfc1]">{t("maid")}</span>
          <br />
          {t("orProfessional")}{" "}
          <span className="text-[#45cfc1]">{t("nurse")}</span>
        </h1>
        <p>
          {t("onlineIn5")}
        </p>
        {/* <div className="flex w-full max-w-lg mx-auto lg:mx-0 h-10 shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4">
          <input
            type="text"
            placeholder={t("findTheMaidOrNurses")}
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-sm"
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#45cfc1]">
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div> */}
        {/* <CategoryCarousel /> */}
      </div>

      {/* Right Side Image */}
      <div className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[600px] h-[200px] sm:h-[300px] lg:h-[600px]">
        <img
          src="/homepage.png"
          alt="Bottom Left Image"
          className="w-full h-full object-cover opacity-90"
        />
      </div>
    </section>
  );
}

export default HeroSection;
