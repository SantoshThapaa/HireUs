import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Jobs = () => {
    const { allJobs } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    // Update filterJobs whenever allJobs changes
    useEffect(() => {
        setFilterJobs(allJobs);
    }, [allJobs]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex gap-5">
                    <div className="w-30%">
                        {/* Pass setFilterJobs as a prop */}
                        <FilterCard setFilterJobs={setFilterJobs} />
                    </div>

                    {/* Job Cards */}
                    {filterJobs.length <= 0 ? (
                        <span>Job not found</span>
                    ) : (
                        <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                            <div className="grid grid-cols-3 gap-4">
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.5 }}
                                        key={job?._id}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
