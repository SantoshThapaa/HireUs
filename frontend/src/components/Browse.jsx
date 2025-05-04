import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setAllJobs, setSearchedQuery } from "@/redux/jobSlice";

const Browse = () => {
  const dispatch = useDispatch();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all jobs from the API
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          setError("Failed to fetch jobs: No data returned");
        }
      } catch (error) {
        setError(error.message || "An error occurred while fetching jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchAllJobs();
  }, [dispatch]);

  // Update filterJobs whenever allJobs or searchedQuery changes
  useEffect(() => {
    const filtered = searchedQuery
      ? allJobs.filter((job) =>
          job.services?.name.toLowerCase().includes(searchedQuery.toLowerCase())
        )
      : allJobs;
    setFilterJobs(filtered);
  }, [allJobs, searchedQuery]);

  // Clear the searched query when the component is unmounted
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <h1 className="font-bold text-xl my-10">
              Search Results ({filterJobs.length || 0})
            </h1>

            {filterJobs.length === 0 ? (
              <p>No jobs found for this category.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    key={job._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
