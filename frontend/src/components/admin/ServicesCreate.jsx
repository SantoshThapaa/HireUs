import { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SERVICES_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleServices } from '@/redux/servicesSlice'

const ServicesCreate = () => {
    const navigate = useNavigate();
    const [servicesName, setServicesName] = useState();
    const dispatch = useDispatch();
    const registerNewServices = async () => {
        try {
            const res = await axios.post(`${SERVICES_API_END_POINT}/register`, {servicesName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleServices(res.data.services));
                toast.success(res.data.message);
                const servicesId = res?.data?.services?._id;
                navigate(`/admin/services/${servicesId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="Enter your office name."
                    onChange={(e) => setServicesName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/services")}>Cancel</Button>
                    <Button className="rounded-xl bg-[#45cfc1]" onClick={registerNewServices}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default ServicesCreate