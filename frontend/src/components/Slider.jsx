// import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const employees = [
  {
    name: "Anna",
    age: 28,
    image: "/images/nurse-1.jpg",
  },
  {
    name: "Sophia",
    age: 32,
    image: "/images/maid-1.jpg",
  },
  {
    name: "Emma",
    age: 25,
    image: "/images/nurse-2.jpg",
  },
  {
    name: "Liam",
    age: 35,
    image: "/images/maid-2.jpg",
  },
];

const Slider = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16  min-h-screen flex items-center justify-center">
      <div className="container mx-auto text-center">
        <h3 className="text-lg text-gray-500 mb-2">- {t("professionalStaff")} -</h3>
        <h1 className="text-3xl font-bold text-primary mb-8">
          {t("nursesAndMaids")}
        </h1>
        <div className="flex justify-center w-full">
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            className="tranding-slider"
          >
            {employees.map((employee, index) => (
              <SwiperSlide key={index} className="w-[300px] h-[400px]">
                <Card className="h-full">
                  <CardHeader className="h-3/5 overflow-hidden">
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="w-full h-full object-cover"
                    />
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardTitle className="text-xl font-semibold text-gray-800">
                      {employee.name}
                    </CardTitle>
                    <p className="text-gray-500">
                      {t("age")}: {employee.age}
                    </p>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev slider-arrow bg-white shadow-md"></div>
            <div className="swiper-button-next slider-arrow bg-white shadow-md"></div>
            <div className="swiper-pagination"></div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Slider;
