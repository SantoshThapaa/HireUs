import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import ServicesTable from './ServicesTable'
import { useNavigate } from 'react-router-dom'
// import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchServicesByText } from '@/redux/servicesSlice'

const Services = () => {
    // useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchServicesByText(input));
    },[input]);
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button className="rounded-2xl bg-[#45cfc1]" onClick={() => navigate("/admin/services/create")}>New Company</Button>
                </div>
                <ServicesTable/>
            </div>
        </div>
    )
}

export default Services