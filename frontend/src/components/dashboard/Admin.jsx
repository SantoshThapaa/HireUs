import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { ADMIN_API_END_POINT } from "@/utils/constant";  // Update this import if necessary

const AdminDashboard = () => {
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch admin dashboard data
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get(`${ADMIN_API_END_POINT}/dashboard`, {
                    withCredentials: true, // include credentials in the request
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

    // Handling loading state and rendering data
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!adminData) {
        return <div>No admin data available</div>;
    }

    return (
        <div className="flex">
            <AdminNavbar />
            <div className="min-h-screen bg-white flex">
                <main className="flex-grow bg-gray-50 p-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>

                    {/* Summary section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        {adminData.summary && Object.entries(adminData.summary).map(([key, value]) => (
                            <div
                                key={key}
                                className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
                            >
                                <p className="text-2xl font-bold text-gray-800">{value}</p>
                                <p className="text-sm text-gray-500">{key}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
