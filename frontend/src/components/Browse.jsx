// import React from 'react'

import { useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar"
import PropTypes from "prop-types";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7];

const Browse = ( ) => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className="">
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <h1 className="font-bold text-xl my-10">Search Results ({Job.length})</h1>
                <div className="grid grid-cols-3 gap-4">
                    {
                        allJobs.map((job) => (
                            <div key={job?._id}>
                                <Job job={job} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

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


export default Browse