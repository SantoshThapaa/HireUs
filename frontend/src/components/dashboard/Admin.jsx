// import React from 'react';

import AdminNavbar from "./AdminNavbar";

const Admin = () => {
    // Dummy data for the cards
    const userInfo = [
        { label: 'Total Members', count: 20, color: 'bg-blue-500' },
        { label: 'Admins', count: 1, color: 'bg-cyan-500' },
        { label: 'Recruiters', count: 2, color: 'bg-teal-500' },
        { label: 'Applicants', count: 17, color: 'bg-blue-400' },
    ];

    const jobInfo = [
        { label: 'Total Jobs', count: 6, color: 'bg-orange-500' },
        { label: 'Pending', count: 4, color: 'bg-green-500' },
        { label: 'Interview', count: 2, color: 'bg-purple-500' },
        { label: 'Declined', count: 0, color: 'bg-red-500' },
    ];

    return (
        <div className="p-6">
            <AdminNavbar/>
            <h2 className="text-2xl font-bold mb-4">User Info</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
                {userInfo.map((info, index) => (
                    <div
                        key={index}
                        className={`${info.color} text-white p-4 rounded-lg shadow-md flex flex-col items-center`}
                    >
                        <p className="text-4xl font-bold">{info.count}</p>
                        <p className="text-lg">{info.label}</p>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">Job Info</h2>
            <div className="grid grid-cols-2 gap-4">
                {jobInfo.map((info, index) => (
                    <div
                        key={index}
                        className={`${info.color} text-white p-4 rounded-lg shadow-md flex flex-col items-center`}
                    >
                        <p className="text-4xl font-bold">{info.count}</p>
                        <p className="text-lg">{info.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
