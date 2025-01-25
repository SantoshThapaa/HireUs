import PropTypes from "prop-types";
import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import Payment from "./Payment";

const shortlistingStatus = ["Accepted", "Rejected"];

// Haversine formula to calculate distance between two geographical points
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

const ApplicantsTable = ({ applicants, job }) => {
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState({});
    const [selectedStatus, setSelectedStatus] = useState({});

    // Function to handle applicant status update and payment logic
    const statusHandler = async (status, applicant) => {
        const { _id, fullname } = applicant.applicant;
        const salary = job?.salary || job?.jobSalary || 0; // Fallback to jobSalary if salary is undefined

        if (status === "Accepted" && !paymentStatus[_id]) {
            // Open payment modal if "Accepted" is selected and payment hasn't been made yet
            setSelectedApplicant({ id: _id, fullname, salary });
            setIsPaymentModalOpen(true);
        } else {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`/api/application/status/${_id}/update`, { status });
                if (res.data.success) {
                    setSelectedStatus((prevState) => ({ ...prevState, [_id]: status }));
                    toast.success(res.data.message);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    };

    // Function to handle successful payment
    const handlePaymentSuccess = async (applicantId) => {
        try {
            setPaymentStatus((prevState) => ({ ...prevState, [applicantId]: true }));
            setSelectedStatus((prevState) => ({ ...prevState, [applicantId]: "Accepted" }));

            axios.defaults.withCredentials = true;
            const res = await axios.post(`/api/application/status/${applicantId}/update`, { status: "Accepted" });

            if (res.data.success) {
                toast.success("Payment successful and status updated");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while updating the status");
        }
    };

    // Calculate distance and recommend applicants
    const recommendedApplicants = applicants
        .map((applicant) => {
            const applicantLatitude = applicant?.applicant?.profile?.location?.latitude || 0;
            const applicantLongitude = applicant?.applicant?.profile?.location?.longitude || 0;
            const jobLatitude = job?.location?.latitude || 0;
            const jobLongitude = job?.location?.longitude || 0;

            const distance = calculateDistance(jobLatitude, jobLongitude, applicantLatitude, applicantLongitude);

            return { ...applicant, distance };
        })
        .sort((a, b) => a.distance - b.distance) // Sort by distance (ascending)
        .slice(0, job?.position || applicants.length); // Limit to job positions or all applicants

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Latitude</TableHead>
                        <TableHead>Longitude</TableHead>
                        <TableHead>Distance (km)</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recommendedApplicants?.length > 0 ? (
                        recommendedApplicants.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {item?.applicant?.profile?.resume ? (
                                        <a
                                            className="text-blue-600 cursor-pointer"
                                            href={item?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a>
                                    ) : (
                                        <span>NA</span>
                                    )}
                                </TableCell>
                                <TableCell>{item?.applicant?.profile?.location?.latitude || "NA"}</TableCell>
                                <TableCell>{item?.applicant?.profile?.location?.longitude || "NA"}</TableCell>
                                <TableCell>{item.distance.toFixed(2)}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {shortlistingStatus.map((status, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => statusHandler(status, item)}
                                                    className={`flex w-fit items-center my-2 cursor-pointer ${
                                                        selectedStatus[item._id] === status ? "font-bold text-blue-600" : ""
                                                    }`}
                                                >
                                                    <span>{status}</span>
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="8" className="text-center">
                                No applicants found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {selectedApplicant && isPaymentModalOpen && (
                <Payment
                    isOpen={isPaymentModalOpen}
                    onClose={() => setIsPaymentModalOpen(false)}
                    applicant={selectedApplicant}
                    onPaymentSuccess={() => handlePaymentSuccess(selectedApplicant.id)}
                />
            )}
        </div>
    );
};

ApplicantsTable.propTypes = {
    applicants: PropTypes.array.isRequired,
    job: PropTypes.shape({
        salary: PropTypes.number,
        jobSalary: PropTypes.number,
        position: PropTypes.number,
        location: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
        }),
    }), // Added location prop
};

export default ApplicantsTable;

