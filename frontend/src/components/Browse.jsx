import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import PropTypes from "prop-types";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useEffect } from "react";

const Browse = () => {
    useGetAllJobs();  // Custom hook to fetch all jobs
    const { allJobs, searchedQuery } = useSelector((store) => store.job);  // Access all jobs and search query
    const dispatch = useDispatch();

    // Clear the searched query when the component is unmounted
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    // Debug log for searchedQuery and allJobs
    console.log("Searched Query:", searchedQuery);
    console.log("All Jobs:", allJobs);

    // Filter jobs based on the selected category
    const filteredJobs = searchedQuery
        ? allJobs.filter((job) =>
            job.services && job.services.name && job.services.name.toLowerCase() === searchedQuery.toLowerCase()
        )
        : allJobs;  // If no category is selected, show all jobs

    // Debug log for filtered jobs
    console.log("Filtered Jobs: ", filteredJobs);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <h1 className="font-bold text-xl my-10">
                    Search Results ({filteredJobs?.length || 0})
                </h1>
                {/* Show a message if no jobs are found */}
                {filteredJobs?.length === 0 ? (
                    <p>No jobs found for this category.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Display filtered jobs */}
                        {filteredJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Add PropTypes validation for the Job component
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
