import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { toast } from 'sonner';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [allApplicants, setAllApplicantsState] = useState([]);
    const [recommendedApplicants, setRecommendedApplicants] = useState([]);
    const [jobDetails, setJobDetails] = useState(null); // Added state for job details
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            setLoading(true);  // Set loading to true on fetch start
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                console.log("API Response:", res.data);

                if (res.data?.job?.applications && res.data.job.applications.length > 0) {
                    // Save all applicants to state and Redux
                    setAllApplicantsState(res.data.job.applications);
                    dispatch(setAllApplicants(res.data.job.applications));

                    // Set job details to be passed to ApplicantsTable
                    setJobDetails(res.data.job);

                    const jobPositions = res.data.job?.position || 0;  // Get number of available positions

                    // Filter applicants based on experience, then sort by experience and age
                    const recommended = res.data.job.applications
                        .filter(application => {
                            const applicantExperience = application?.applicant?.profile?.experience || 0;
                            const requiredExperience = res.data.job?.experienceLevel || 0;

                            // Only include applicants with experience >= job's required experience
                            return applicantExperience >= requiredExperience;
                        })
                        .sort((a, b) => {
                            const experienceA = a?.applicant?.profile?.experience || 0;
                            const experienceB = b?.applicant?.profile?.experience || 0;
                            const ageA = a?.applicant?.profile?.age || 0;
                            const ageB = b?.applicant?.profile?.age || 0;

                            // Sort by experience (desc), if experiences are the same, sort by age (asc)
                            if (experienceA !== experienceB) {
                                return experienceB - experienceA;  // Descending order for experience
                            }
                            return ageA - ageB;  // Ascending order for age (younger applicants preferred)
                        })
                        .slice(0, jobPositions);  // Limit to the number of available positions

                    setRecommendedApplicants(recommended);
                } else {
                    toast.info('No applicants found for this job.');
                }
            } catch (error) {
                console.error('Error fetching applicants:', error);
                toast.error('Error fetching applicants!');
            } finally {
                setLoading(false);  // Set loading to false when done
            }
        };

        fetchAllApplicants();
    }, [params.id, dispatch]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>
                    All Applicants ({allApplicants.length})
                </h1>
                {/* Pass the jobDetails as prop to ApplicantsTable */}
                <ApplicantsTable applicants={allApplicants} job={jobDetails} />

                <h1 className='font-bold text-xl my-5'>
                    Recommended Applicants ({recommendedApplicants.length})
                </h1>
                {/* Pass the jobDetails as prop to ApplicantsTable */}
                <ApplicantsTable applicants={recommendedApplicants} job={jobDetails} />
            </div>
        </div>
    );
};

export default Applicants;
