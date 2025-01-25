import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";  // Import Framer Motion for animations

import AdminNavbar from "./AdminNavbar";
import { ADMIN_API_END_POINT } from "@/utils/constant";

const Stats = () => {
    const [statsData, setStatsData] = useState({
        applicants: { pending: 0, selected: 0, rejected: 0 },
        users: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatsData = async () => {
            try {
                const response = await axios.get(`${ADMIN_API_END_POINT}/admindashboard`, { withCredentials: true });
                if (response.data.success) {
                    setStatsData(response.data.data); // Assuming response has `data` containing stats
                } else {
                    setError("Failed to fetch stats data.");
                }
            } catch (err) {
                setError("Error fetching stats: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStatsData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const { applicants } = statsData;

    // Prepare pie chart data
    const pieData = [
        { name: "Pending", value: applicants.pending },
        { name: "Selected", value: applicants.selected },
        { name: "Rejected", value: applicants.rejected },
    ];

    return (
        <div className="flex">
            <AdminNavbar />
            <div className="min-h-screen bg-white flex flex-col p-8 gap-8">
                

                {/* Applicants Pie Chart */}
                <div className="flex gap-8">
                    <div className="mb-8 flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 m-10">Applicants Status</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={120}
                                    fill="#8884d8"
                                    animationDuration={1500} // Add animation
                                    animationEasing="ease-in-out"
                                >
                                    <Cell name="Pending" fill="#ff7300" />
                                    <Cell name="Selected" fill="#00c49f" />
                                    <Cell name="Rejected" fill="#ff0000" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Color Legend */}
                    <motion.div
                        className="flex flex-col justify-center items-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Legend</h4>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6" style={{ backgroundColor: "#ff7300" }}></div>
                            <span className="text-gray-800">Pending</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6" style={{ backgroundColor: "#00c49f" }}></div>
                            <span className="text-gray-800">Selected</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6" style={{ backgroundColor: "#ff0000" }}></div>
                            <span className="text-gray-800">Rejected</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
