import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import PropTypes from 'prop-types'; 
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import Payment from './Payment'; // Import the Payment component

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = ({ applicants }) => {
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState({}); // Payment status tracking
    const [selectedStatus, setSelectedStatus] = useState({}); // Track selected status for each applicant

    const statusHandler = async (status, id, salary, fullname) => {
        if (status === 'Accepted' && !paymentStatus[id]) {
            // Open payment modal if "Accepted" is selected and payment hasn't been made yet
            setSelectedApplicant({ id, fullname, salary });
            setIsPaymentModalOpen(true);
        } else {
            // If status is not "Accepted", directly update the status
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
                if (res.data.success) {
                    setSelectedStatus(prevState => ({ ...prevState, [id]: status }));
                    toast.success(res.data.message);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    };

    const handlePaymentSuccess = async (applicantId) => {
        try {
            // Update the payment status locally
            setPaymentStatus(prevState => ({ ...prevState, [applicantId]: true }));
            setSelectedStatus(prevState => ({ ...prevState, [applicantId]: "Accepted" }));
            
            // Now update the status on the server
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${applicantId}/update`, { status: 'Accepted' });
    
            if (res.data.success) {
                toast.success('Payment successful and status updated');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred while updating the status');
        }
    };
    

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
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants?.length > 0
                            ? applicants.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item?.applicant?.fullname}</TableCell>
                                    <TableCell>{item?.applicant?.email}</TableCell>
                                    <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                    <TableCell>
                                        {item?.applicant?.profile?.resume
                                            ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                                {item?.applicant?.profile?.resumeOriginalName}
                                              </a>
                                            : <span>NA</span>
                                        }
                                    </TableCell>
                                    <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="float-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                {shortlistingStatus.map((status, index) => (
                                                    <div 
                                                        key={index}
                                                        onClick={() => statusHandler(status, item?._id, item?.salary, item?.applicant?.fullname)} 
                                                        className={`flex w-fit items-center my-2 cursor-pointer ${selectedStatus[item._id] === status ? 'font-bold text-blue-600' : ''}`}
                                                    >
                                                        <span>{status}</span>
                                                    </div>
                                                ))}
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                            : (
                                <TableRow>
                                    <TableCell colSpan="6" className="text-center">No applicants found</TableCell>
                                </TableRow>
                            )
                    }
                </TableBody>
            </Table>

            {selectedApplicant && (
                <Payment 
                    isOpen={isPaymentModalOpen}
                    onClose={() => setIsPaymentModalOpen(false)}
                    applicant={selectedApplicant} // Pass the whole selectedApplicant
                    onPaymentSuccess={() => handlePaymentSuccess(selectedApplicant.id)} // Pass the applicant ID
                />
            )}
        </div>
    );
};

// Adding PropTypes to validate props
ApplicantsTable.propTypes = {
    applicants: PropTypes.array.isRequired,  // Expect applicants as an array
};

export default ApplicantsTable;
