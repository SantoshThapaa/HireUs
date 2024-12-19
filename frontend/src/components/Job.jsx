// import React from 'react'

import { Bookmark } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Badge } from "./ui/badge"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

const Job = ({job}) => {
    const navigate= useNavigate();
    // const jobId = "lseknghsjdfajdnkj";
    const daysAgoFunction = (mongodbTime)=>{
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/ (1000*24*60*60));
    }
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">{daysAgoFunction(job?.createdAt) == 0? "Today" :`${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>
            <div className="flex items-center gap-2 my-2">
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://i.pravatar.cc/100" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-lg">{job?.services?.name}</h1>
                    <p className="text-sm text-gray-400">Nepal</p>
                </div>
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
            <div className="flex items-center gap-2 mt-4">
                <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#45cfc1]">Save For Later</Button>
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

export default Job