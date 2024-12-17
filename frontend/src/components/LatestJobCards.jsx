// import React from 'react'

import { Badge } from "./ui/badge";

const LatestJobCards = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
        <div>
            <h1 className="font-medium text-lg">Client Name</h1>
            <p className="text-sm text-gray-300">Nepal</p>
        </div>                                                                             
        <div>
            <h1 className="font-bold text-lg my-2">Job Title</h1>
            <p className="text-sm text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis odio rem non eaque amet ratione, accusamus consequatur quo sapiente assumenda, doloremque tempora voluptatum officiis, repudiandae explicabo corrupti quaerat ipsum aliquid!\</p>
        </div>                 
        <div className="flex items-center gap-2 mt-4">
            <Badge className={'text-[#5fa794]  font-bold'} variant="ghost">12 Positions</Badge>
            <Badge className={'text-[#5fa794]  font-bold'} variant="ghost">Part Time</Badge>
            <Badge className={'text-[#5fa794]  font-bold'} variant="ghost">24LPA</Badge>
        </div>
    </div>                     
  )
}

export default LatestJobCards