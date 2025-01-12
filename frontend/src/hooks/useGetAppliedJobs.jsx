import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                console.log("Applied Jobs Response:", res.data);
        
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application)); // Make sure this matches the response structure
                } else {
                    console.log("No applied jobs found.");
                }
            } catch (error) {
                console.log("Error fetching applied jobs:", error);
            }
        }        
        fetchAppliedJobs();
    },[])
};
export default useGetAppliedJobs;