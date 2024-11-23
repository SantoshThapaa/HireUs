// import React from 'react';
import { Button } from '@/components/ui/button';

const MaidServiceSection = () => {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white p-8 rounded-lg">
            {/* Text Section */}
            <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Online Maid Service
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                    Book a professional housekeeper for your daily chores.
                </p>
                <Button className="bg-[#45cfc1] text-black px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-300">
                    Book Now
                </Button>
            </div>

            {/* Image/Video Section */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center relative">
                <div className="relative">
                    <div className="absolute inset-0 border-4 border-yellow-500 rounded-lg transform translate-x-4 translate-y-4"></div>
                    <iframe
                        src="https://via.placeholder.com/600x400" // Replace with your image URL
                        alt="Maid Service"
                        className="rounded-lg shadow-lg w-[500px] h-[400px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default MaidServiceSection;
