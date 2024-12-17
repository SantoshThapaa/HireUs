import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

const JobDescription = () => {
    const isApplied = true;
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-xl">Title</h1>
                    <div className="flex items-center gap-2 mt-4">
                        <Badge className={'text-[#5fa794]  font-bold'} variant="ghost">12 Positions</Badge>
                        <Badge className={'text-[#5fa794]  font-bold'} variant="ghost">Part Time</Badge>
                        <Badge className={'text-[#5fa794]  font-bold'} variant="ghost">NRs.12000</Badge>
                    </div>
                </div>
                <Button className={`rounded-lg ${isApplied ? 'bg-[#6fc9b1] cursor-not-allowed' : 'bg-[#669588] hover:bg-[#467f70]'}}`}>{isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Office Maid</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Lalitpur</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Lorem ipsum nnnthe thyuo dgerth</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>2 yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>Rs.12000</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>4</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>17-12-2024</span></h1>
            </div>
        </div>
    )
}

export default JobDescription