import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import PropTypes from "prop-types";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useEffect } from "react";

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector((store) => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <h1 className="font-bold text-xl my-10">
                    Search Results ({allJobs?.length || 0})
                </h1>
                <div className="grid grid-cols-3 gap-4">
                    {allJobs &&
                        allJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                </div>
            </div>
        </div>
    );
};

// Add PropTypes validation
Job.propTypes = {
    job: PropTypes.shape({
        services: PropTypes.shape({
            name: PropTypes.string,
        }),
        title: PropTypes.string,
        description: PropTypes.string,
        position: PropTypes.number,
        jobType: PropTypes.string,
        salary: PropTypes.number,
        createdAt: PropTypes.string,
        _id: PropTypes.string,
    }).isRequired,
};

export default Browse;
