import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const employees = [
  {
    name: "Fulkumari Gurung",
    age: 40,
    job: "Maid",
    image: "/women1.jpg",
  },
  {
    name: "Sophia Bhujel",
    age: 32,
    job: "Nurse",
    image: "/women2.jpg",
  },
  {
    name: "Emma",
    age: 25,
    job: "Maid",
    image: "/women1.jpg",
  },
  {
    name: "Liam",
    age: 35,
    job: "Nurseh",
    image: "/women2.jpg",
  },
  {
    name: "Emma",
    age: 25,
    job: "Maid",
    image: "/women1.jpg",
  },
  {
    name: "Liam",
    age: 35,
    job: "Maid",
    image: "/women2.jpg",
  },
  {
    name: "Emma",
    age: 25,
    job: "Nyani",
    image: "/women1.jpg",
  },
  {
    name: "Liam",
    age: 35,
    job: "Caretaker",
    image: "/women2.jpg",
  },
];

const Slider = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
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
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
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
              <SwiperSlide key={index} className="w-[300px] h-[450px] items-center">
                <Card className="h-full">
                  <CardHeader className="h-full overflow-hidden p-0">
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="w-full h-full object-cover"
                    />
                  </CardHeader>
                  <CardContent className="absolute bottom-0 bg-[#45cfc1] bg-opacity-90 w-full text-center py-2">
                    <CardTitle className="text-xl font-semibold text-gray-800">
                      {employee.name}
                    </CardTitle>
                    <p className="text-gray-500">
                      {t("age")}: {employee.age},
                      <br />
                      {t("job")}: {employee.job}
                    </p>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev slider-arrow bg-[#ebeded] shadow-md mt-8"></div>
            <div className="swiper-button-next slider-arrow bg-[#ebeded] shadow-md mt-8"></div>
            {/* Swiper Pagination */}
            <div className="swiper-pagination mt-6"></div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};


export default Slider;
