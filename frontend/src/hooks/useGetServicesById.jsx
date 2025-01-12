import { setSingleServices } from '@/redux/servicesSlice'
import { SERVICES_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetServicesById = (servicesId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleServices = async () => {
            try {
                const res = await axios.get(`${SERVICES_API_END_POINT}/get/${servicesId}`,{withCredentials:true});
                console.log(res.data.services);
                if(res.data.success){
                    dispatch(setSingleServices(res.data.services));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleServices();
    },[servicesId, dispatch])
}

export default useGetServicesById