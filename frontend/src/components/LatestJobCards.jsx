// import React from 'react'

import PropTypes from "prop-types";
import { Badge } from "./ui/badge";

const LatestJobCards = ({job}) => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
        <div>
            <h1 className="font-medium text-lg">{job?.services?.name}</h1>
            <p className="text-sm text-gray-300">Nepal</p>
        </div>                                                                             
        <div>
            <h1 className="font-bold text-lg my-2">{job?.title}</h1>
            <p className="text-sm text-gray-600">{job?.description}</p>
        </div>                 
        <div className="flex items-center gap-2 mt-4">
            <Badge className={'text-[#5fa794]  font-bold'} variant="ghost">{job?.position} Positions</Badge>
            <Badge className={'text-[#5fa794]  font-bold'} variant="ghost">{job?.jobType}</Badge>
            <Badge className={'text-[#5fa794]  font-bold'} variant="ghost">NRs.{job?.salary}k</Badge>
        </div>
    </div>                     
  )
}

// Add PropTypes validation
LatestJobCards.propTypes = {
  job: PropTypes.shape({
    services: PropTypes.shape({
      name: PropTypes.string,
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.number,
    jobType: PropTypes.string,
    salary: PropTypes.number,
  }).isRequired,
};


export default LatestJobCards;