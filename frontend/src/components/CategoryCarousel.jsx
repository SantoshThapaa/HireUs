// import React from 'react';
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const CategoryCarousel = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    // Map your category keys with i18n translation keys
    const categories = [
        "clinicalNurseSpecialist",
        "cardiacNurse",
        "babySitterService",
        "nurseMidwife",
        "officeMaidService",
        "mentalHealthNurse",
        "oncologyNurse",
        "houseMaid",
        "caretaker",
        "cardiacNurse"
    ];

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-10">
                <CarouselContent>
                    {
                        categories.map((categoryKey, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
                                <Button onClick={()=>searchJobHandler(categoryKey)} variant="outline">{t(`categories.${categoryKey}`)}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

export default CategoryCarousel;
