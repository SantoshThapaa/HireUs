import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { toast } from 'sonner';

// Haversine formula to calculate distance between two points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => (degree * Math.PI) / 180;
    const R = 6371; // Earth's radius in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [allApplicants, setAllApplicantsState] = useState([]);
    const [recommendedApplicants, setRecommendedApplicants] = useState([]);
    const [jobDetails, setJobDetails] = useState(null); // Added state for job details
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            setLoading(true); // Set loading to true on fetch start
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                console.log("API Response:", res.data);

                if (res.data?.job?.applications && res.data.job.applications.length > 0) {
                    // Save all applicants to state and Redux
                    setAllApplicantsState(res.data.job.applications);
                    dispatch(setAllApplicants(res.data.job.applications));

                    // Set job details to be passed to ApplicantsTable
                    setJobDetails(res.data.job);

                    const jobPositions = res.data.job?.position || 0; // Get number of available positions
                    const jobLatitude = res.data.job?.location?.latitude || 0;
                    const jobLongitude = res.data.job?.location?.longitude || 0;

                    // Filter and sort applicants for recommendations
                    const recommended = res.data.job.applications
                        .map((application) => {
                            const applicantLatitude = application?.applicant?.profile?.location?.latitude || 0;
                            const applicantLongitude = application?.applicant?.profile?.location?.longitude || 0;

                            const distance = calculateDistance(
                                jobLatitude,
                                jobLongitude,
                                applicantLatitude,
                                applicantLongitude
                            );

                            return {
                                ...application,
                                distance,
                            };
                        })
                        .filter((application) => {
                            const applicantExperience = application?.applicant?.profile?.experience || 0;
                            const requiredExperience = res.data.job?.experienceLevel || 0;

                            // Include applicants with sufficient experience and within 50 km
                            return applicantExperience >= requiredExperience && application.distance <= 50;
                        })
                        .sort((a, b) => {
                            const experienceA = a?.applicant?.profile?.experience || 0;
                            const experienceB = b?.applicant?.profile?.experience || 0;

                            // Sort by experience (desc), distance (asc), and age (asc)
                            if (experienceA !== experienceB) return experienceB - experienceA;

                            const distanceA = a.distance || Infinity;
                            const distanceB = b.distance || Infinity;

                            if (distanceA !== distanceB) return distanceA - distanceB;

                            const ageA = a?.applicant?.profile?.age || 0;
                            const ageB = b?.applicant?.profile?.age || 0;
                            return ageA - ageB;
                        })
                        .slice(0, jobPositions); // Limit to the number of available positions

                    setRecommendedApplicants(recommended);
                } else {
                    toast.info('No applicants found for this job.');
                }
            } catch (error) {
                console.error('Error fetching applicants:', error);
                toast.error('Error fetching applicants!');
            } finally {
                setLoading(false); // Set loading to false when done
            }
        };

        fetchAllApplicants();
    }, [params.id, dispatch]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto">
                <h1 className="font-bold text-xl my-5">
                    All Applicants ({allApplicants.length})
                </h1>
                {/* Pass the jobDetails as prop to ApplicantsTable */}
                <ApplicantsTable applicants={allApplicants} job={jobDetails} />

                <h1 className="font-bold text-xl my-5">
                    Recommended Applicants ({recommendedApplicants.length})
                </h1>
                {/* Pass the jobDetails as prop to ApplicantsTable */}
                <ApplicantsTable applicants={recommendedApplicants} job={jobDetails} />
            </div>
        </div>
    );
};

export default Applicants;
