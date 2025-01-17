import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const ManageServices = () => {
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
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Services</h1>
                {/* Services Table */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Services</h3>
                    <Table>
                        <TableCaption>List of all services</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Website</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {adminData.data.services && adminData.data.services.length > 0 ? (
                                adminData.data.services.map((service) => (
                                    <TableRow key={service._id}>
                                        <TableCell>{service.name || "N/A"}</TableCell>
                                        <TableCell>{service.description || "N/A"}</TableCell>
                                        <TableCell>{service.location || "N/A"}</TableCell>
                                        <TableCell>
                                            {service.website ? (
                                                <a href={service.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                    {service.website}
                                                </a>
                                            ) : (
                                                "N/A"
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4}>No services found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default ManageServices;
