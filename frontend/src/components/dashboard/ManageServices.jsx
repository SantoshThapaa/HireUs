import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const ManageServices = () => {
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

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

    // Binary Sort Implementation (sorting by service name)
    const binarySort = (arr) => {
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let left = 0;
            let right = i;

            while (left < right) {
                const mid = Math.floor((left + right) / 2);
                const midValue = arr[mid].name.toLowerCase();

                if (midValue < key.name.toLowerCase()) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }

            for (let j = i; j > left; j--) {
                arr[j] = arr[j - 1];
            }
            arr[left] = key;
        }
        return arr;
    };

    // Handle search input
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Sorted Services Array
    const sortedServices = adminData?.data?.services ? binarySort([...adminData.data.services]) : [];

    // Filter services based on search term (after sorting)
    const filteredServices = searchTerm
        ? sortedServices.filter((service) =>
              service.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : sortedServices;

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

                {/* Search Input */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 mb-4 border border-gray-300 rounded"
                    placeholder="Search by name..."
                />

                {/* Services Table */}
                <div>
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
                            {filteredServices.length > 0 ? (
                                filteredServices.map((service) => (
                                    <TableRow key={service._id}>
                                        <TableCell>{service.name || "N/A"}</TableCell>
                                        <TableCell>{service.description || "N/A"}</TableCell>
                                        <TableCell>{service.location || "N/A"}</TableCell>
                                        <TableCell>
                                            {service.website ? (
                                                <a
                                                    href={service.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline"
                                                >
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
