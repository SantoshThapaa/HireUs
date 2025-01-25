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
    const [jobDetails, setJobDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    // Haversine formula to calculate the distance between two coordinates
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in kilometers
        const toRadians = (degrees) => (degrees * Math.PI) / 180;

        const deltaLat = toRadians(lat2 - lat1);
        const deltaLon = toRadians(lon2 - lon1);

        const a =
            Math.sin(deltaLat / 2) ** 2 +
            Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(deltaLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
    };
    useEffect(() => {
        const fetchAllApplicants = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                if (res.data?.job?.applications && res.data.job.applications.length > 0) {
                    setAllApplicantsState(res.data.job.applications);
                    dispatch(setAllApplicants(res.data.job.applications));

                    setJobDetails(res.data.job);

                    const jobLatitude = res.data.job?.location?.latitude || 0;
                    const jobLongitude = res.data.job?.location?.longitude || 0;

                    const recommended = res.data.job.applications
                        .map((application) => {
                            const applicantLatitude = application?.applicant?.profile?.location?.latitude || 0;
                            const applicantLongitude = application?.applicant?.profile?.location?.longitude || 0;
                            const distance = calculateDistance(jobLatitude, jobLongitude, applicantLatitude, applicantLongitude);

                            return {
                                ...application,
                                distance,
                            };
                        })
                        .filter((application) => {
                            const applicantExperience = application?.applicant?.profile?.experience || 0;
                            const requiredExperience = res.data.job?.experienceLevel || 0;

                            return applicantExperience >= requiredExperience && application.distance <= 50;
                        })
                        .sort((a, b) => {
                            const experienceA = a?.applicant?.profile?.experience || 0;
                            const experienceB = b?.applicant?.profile?.experience || 0;
                            if (experienceA !== experienceB) return experienceB - experienceA;

                            const distanceA = a.distance || Infinity;
                            const distanceB = b.distance || Infinity;
                            return distanceA - distanceB;
                        });

                    setRecommendedApplicants(recommended);
                } else {
                    toast.info('No applicants found for this job.');
                }
            } catch (error) {
                toast.error('Error fetching applicants!');
                console.log("error", error);
            } finally {
                setLoading(false);
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
                <ApplicantsTable applicants={allApplicants} job={jobDetails} />

                <h1 className="font-bold text-xl my-5">
                    Recommended Applicants ({recommendedApplicants.length})
                </h1>
                <ApplicantsTable applicants={recommendedApplicants} job={jobDetails} />
            </div>
        </div>
    );
};

export default Applicants;
