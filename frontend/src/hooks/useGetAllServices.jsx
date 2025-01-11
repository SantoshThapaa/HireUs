
// import { setAllJobs } from '@/redux/jobSlice'
import { setServices } from '@/redux/servicesSlice'
import { SERVICES_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllServices = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchServices = async () => {
            try {
                const res = await axios.get(`${SERVICES_API_END_POINT}/get`,{withCredentials:true});
                console.log(res.data.services);
                if(res.data.success){
                    dispatch(setServices(res.data.services));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchServices();
    },[])
}

export default useGetAllServices