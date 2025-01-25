import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [data, setData] = useState([]);
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
          setData(res.data.jobs);
          setFilterJobs(res.data.jobs); // Initialize filterJobs with fetched data
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
  }, []);

  // Update filterJobs whenever allJobs changes
  useEffect(() => {
    setFilterJobs(data);
  }, [data]);

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
          {/* Filter Section */}
          <div className="w-[14%]">
            <FilterCard setFilterJobs={setFilterJobs} jobs={data} />
          </div>

          {/* Job Cards Section */}
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {filterJobs.length === 0 ? (
              <span>No jobs found</span>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;