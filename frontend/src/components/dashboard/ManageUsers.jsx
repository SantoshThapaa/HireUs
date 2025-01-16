import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";


const ManageUsers = () => {
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get(`${ADMIN_API_END_POINT}/dashboard`, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    setAdminData(response.data.data);
                } else {
                    console.error("Failed to fetch admin data");
                }
            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!adminData) {
        return <div>No admin data available</div>;
    }

    return (
        <div className="flex">
            <AdminNavbar />
            <div className="min-h-screen bg-white flex flex-col p-8 gap-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Users & Services</h1>

                {/* Users Table */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Users</h3>
                    <Table>
                        <TableCaption>List of all users</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {adminData.data.users && adminData.data.users.length > 0 ? (
                                adminData.data.users.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell>{user?.name}</TableCell>
                                        <TableCell>{user?.email}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={2}>No users found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Services Table */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Services</h3>
                    <Table>
                        <TableCaption>List of all services</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {adminData.data.services && adminData.data.services.length > 0 ? (
                                adminData.data.services.map((service) => (
                                    <TableRow key={service._id}>
                                        <TableCell>{service.title}</TableCell>
                                        <TableCell>{service.description}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={2}>No services found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Applicants section */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Applicants</h3>
                    <ul>
                        {adminData.data.applicants && adminData.data.applicants.length > 0 ? (
                            adminData.data.applicants.map((applicant) => (
                                <li key={applicant._id} className="mb-2">
                                    <p className="text-sm text-gray-600">
                                        Job Title: {applicant.jobId?.title} - Company: {applicant.jobId?.companyName}
                                    </p>
                                </li>
                            ))
                        ) : (
                            <p>No applicants found.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
