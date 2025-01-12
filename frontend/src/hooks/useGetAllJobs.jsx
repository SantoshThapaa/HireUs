import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    const [loading, setLoading] = useState(false); // State to track loading status
    const [error, setError] = useState(null); // State to track error messages

    useEffect(() => {
        const fetchAllJobs = async () => {
            // Skip fetch if searchedQuery is empty
            if (!searchedQuery) {
                return;
            }

            const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
            
            if (!token) {
                setError("Authentication token is missing.");
                return;
            }

            setLoading(true); // Set loading state to true

            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
                    {
                        withCredentials: true,
                        headers: {
                            'Authorization': `Bearer ${token}`, // Include token in request header
                        },
                    }
                );

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs)); // Dispatch jobs data to Redux
                } else {
                    setError(`Failed to fetch jobs: ${res.data.message}`); // Handle failure response
                }
            } catch (error) {
                // Detailed error handling
                if (error.response) {
                    setError(`Error Response: ${error.response.data}`);
                    console.log('Error Response:', error.response.data);
                    console.log('Error Status:', error.response.status);
                } else if (error.request) {
                    setError('No response received from the server');
                    console.log('No response received:', error.request);
                } else {
                    setError(`Error: ${error.message}`);
                    console.log('Error:', error.message);
                }
            } finally {
                setLoading(false); // Set loading state to false after request finishes
            }
        };

        fetchAllJobs();
    }, [searchedQuery, dispatch]); // Runs when searchedQuery changes

    return { loading, error }; // Return loading and error state for potential usage
};

export default useGetAllJobs;
