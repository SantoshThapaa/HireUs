// import React from 'react';
import { useTranslation } from 'react-i18next';

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import CategoryCarousel from './CategoryCarousel';


function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative flex flex-col gap-5 my-3 lg:flex-row items-center border-collapse justify-between bg-white p-4 lg:p-12">
      {/* Left Side Content */}
      <div className="left">
        <div className="flex flex-col gap-5 my-10">
          <span className="mx-auto px-3 py-2 rounded-full bg-gray-100 text-[#4273a1] font-medium">
            {t('ultimateSolution')}
          </span>
          <h1 className="text-5xl font-bold leading-normal">
            {t('getAFullTime')} <span className="text-[#45cfc1]">{t('maid')}</span>
            <br />
            {t('orProfessional')} <span className="text-[#45cfc1]">{t('nurse')}</span>
          </h1>
          <p>{t('onlineIn5')}</p>
          <div className="flex w-[100%] h-10 shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
            <input
              type="text"
              placeholder={t('findTheMaidOrNurses')}
              className="outline-none border-none w-full"
            />
            <Button className="rounded-r-full bg-[#45cfc1]">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          <CategoryCarousel />
        </div>
      </div>
      {/* Right Side Image */}
      <div className="relative w-full max-w-[400px] h-[300px] lg:max-w-[600px] lg:h-[600px]"> 
        <img
          src="/homepage.png"
          alt="Bottom Left Image"
          className="w-full h-full object-cover opacity-75 transform translate-y-1"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>
    </section>
  );
}

export default HeroSection;
