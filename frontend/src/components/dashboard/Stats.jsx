import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';

const Stats = () => {
    const [stats, setStats] = useState({ pieData: [], lineData: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get('/api/stats');
                setStats({
                    pieData: data.pieData || [],
                    lineData: data.lineData || [],
                });
                setLoading(false);
            } catch (err) {
                console.error(err); // Log the error for debugging
                setError(`Error fetching data: ${err.message}`);
                setLoading(false);
            }
            
        };
        fetchStats();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const { pieData, lineData } = stats;

    return (
        <div className="p-6 flex flex-col">
            <AdminNavbar />
            <h2 className="text-2xl font-bold mb-6">Overall Statistics</h2>
            <div className="flex space-x-6">
                {/* Pie Chart Section */}
                <div>
                    <PieChart width={300} height={300}>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>

                {/* Line Chart Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Job Application Stats</h3>
                    <LineChart
                        width={600}
                        height={300}
                        data={lineData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="applications" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </div>
            </div>
        </div>
    );
};

export default Stats;
