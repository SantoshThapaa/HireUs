import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const ManageUsers = () => {
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

    // Binary Sort Logic
    const binarySort = (arr) => {
        // Check if data exists and if `fullname` field is present
        if (!arr || arr.length === 0) return [];

        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let left = 0;
            let right = i;

            // Binary search to find the correct position for `key` (name)
            while (left < right) {
                const mid = Math.floor((left + right) / 2);
                const midValue = arr[mid]?.fullname.toLowerCase() || ''; // Ensure `fullname` exists

                if (midValue < key?.fullname.toLowerCase()) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }

            // Shift elements to the right to make space for `key`
            for (let j = i; j > left; j--) {
                arr[j] = arr[j - 1];
            }

            // Insert `key` at its correct position
            arr[left] = key;
        }

        return arr;
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Apply binary sorting to the users data
    const sortedUsers = adminData?.data?.users ? binarySort([...adminData.data.users]) : [];

    // Filter users if there's a search term
    const filteredUser = searchTerm
        ? sortedUsers.filter((user) =>
              user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : sortedUsers;

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

                {/* Search Input */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 mb-4 border border-gray-300 rounded"
                    placeholder="Search by name..."
                />

                {/* Users Table */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Users</h3>
                    <Table>
                        <TableCaption>List of all users</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Phone Number</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUser.length > 0 ? (
                                filteredUser.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell>{user.fullname || "N/A"}</TableCell>
                                        <TableCell>{user.email || "N/A"}</TableCell>
                                        <TableCell>{user.role || "N/A"}</TableCell>
                                        <TableCell>{user.phoneNumber || "N/A"}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4}>No users found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
