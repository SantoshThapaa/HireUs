import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
// import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const Job = ({ job = {} }) => {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Check local storage on component mount
    useEffect(() => {
        if (job._id) {
            const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
            setIsSaved(savedJobs.includes(job._id));

            const bookmarkedJobs = JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];
            setIsBookmarked(bookmarkedJobs.includes(job._id));
        }
    }, [job._id]);

    const handleSaveForLater = () => {
        if (job._id) {
            const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
            if (savedJobs.includes(job._id)) {
                const updatedJobs = savedJobs.filter((id) => id !== job._id);
                localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
                setIsSaved(false);
            } else {
                savedJobs.push(job._id);
                localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
                setIsSaved(true);
            }
        }
    };

    const handleBookmark = () => {
        if (job._id) {
            const bookmarkedJobs = JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];
            if (bookmarkedJobs.includes(job._id)) {
                const updatedJobs = bookmarkedJobs.filter((id) => id !== job._id);
                localStorage.setItem("bookmarkedJobs", JSON.stringify(updatedJobs));
                setIsBookmarked(false);
            } else {
                bookmarkedJobs.push(job._id);
                localStorage.setItem("bookmarkedJobs", JSON.stringify(bookmarkedJobs));
                setIsBookmarked(true);
            }
        }
    };

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Fixed calculation
    };

    return (
        <div className="rounded-md shadow-xl bg-white border border-gray-200 p-8">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                    {job?.createdAt
                        ? daysAgoFunction(job.createdAt) === 0
                            ? "Today"
                            : `${daysAgoFunction(job.createdAt)} days ago`
                        : "N/A"}
                </p>
                <Button
                    variant="outline"
                    className={`rounded-full ${isBookmarked ? "bg-[#45cfc1] text-white" : ""}`}
                    size="icon"
                    onClick={handleBookmark}
                >
                    <Bookmark />
                </Button>
            </div>
            <div className="flex items-center gap-2 my-2">
                {/* <Button className="p-6" variant="outline" size="icon"> */}
                    {/* <Avatar>
                        <AvatarImage src="/SARATHI.png" className="object-contain"/>
                    </Avatar> */}
                {/* </Button> */}
                <div>
                    <h1 className="font-medium text-lg">{job?.services?.name || "Unknown Service"}</h1>
                    <p className="text-sm text-gray-400">{job?.location?.address || "Nepal"}</p>
                </div>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title || "No Title"}</h1>
                <p className="text-sm text-gray-600">{job?.description || "No Description Available"}</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className="text-[#5fa794] font-bold" variant="ghost">
                    {job?.position || 0} Positions
                </Badge>
                <Badge className="text-[#5fa794] font-bold" variant="ghost">
                    {job?.jobType || "N/A"}
                </Badge>
                <Badge className="text-[#5fa794] font-bold" variant="ghost">
                    NRs.{job?.salary || 0}
                </Badge>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">
                    Details
                </Button>
                <Button
                    className={`bg-[#45cfc1] ${isSaved ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handleSaveForLater}
                >
                    {isSaved ? "Saved" : "Save For Later"}
                </Button>
            </div>
        </div>
    );
};

Job.propTypes = {
    job: PropTypes.shape({
        services: PropTypes.shape({
            name: PropTypes.string,
            logo: PropTypes.string,
        }),
        title: PropTypes.string,
        description: PropTypes.string,
        position: PropTypes.number,
        jobType: PropTypes.string,
        salary: PropTypes.number,
        location: PropTypes.shape({
            address: PropTypes.string,
        }),
        createdAt: PropTypes.string,
        _id: PropTypes.string,
    }).isRequired,
};

export default Job;
