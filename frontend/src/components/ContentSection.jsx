import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MaidServiceSection = () => {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white p-6 sm:p-8 rounded-lg">
            {/* Text Section */}
            <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
                    Online Maid Service
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6">
                    Book a professional housekeeper for your daily chores.
                </p>
                <Link to="/jobs">
            <Button className="bg-[#45cfc1] text-black px-4 sm:px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-300">
                Book Now
            </Button>
        </Link>
            </div>

            {/* Image/Video Section */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center relative mr-5">
                <div className="relative">
                    {/* Yellow Border */}
                    <div className="absolute inset-0 border-2 sm:border-4 border-yellow-500 rounded-lg transform translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4"></div>
                    
                    {/* Video Embed */}
                    <iframe
                        src="https://www.youtube.com/embed/ZK-rNEhJIDs?si=mcC7MXJEBNX7vtQS"
                        title="Maid Service"
                        className="rounded-lg shadow-lg w-[600px] max-w-[700px] h-[200px] sm:h-[300px] md:h-[400px]"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default MaidServiceSection;
