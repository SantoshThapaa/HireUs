import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer as LineResponsiveContainer } from "recharts";
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

    const { applicants, users } = statsData;

    // Prepare line chart data
    const lineChartData = (users || []).map((user) => ({
        name: user.date, // Ensure users have 'date' field
        count: user.count, // Ensure users have 'count' field
    }));

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
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Admin Stats</h1>

                {/* Applicants Pie Chart */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Applicants Status</h3>
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

                {/* Users Registration Line Chart */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">User Registration Over Time</h3>
                    <LineResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#8884d8"
                                animationDuration={1500} // Add animation
                                animationEasing="ease-in-out"
                            />
                        </LineChart>
                    </LineResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Stats;
