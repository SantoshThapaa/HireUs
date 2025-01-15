// import React from 'react';
import { useLocation, Link } from "react-router-dom";

const AdminNavbar = () => {
    const location = useLocation(); // Get the current location
    
    // Define the navigation items
    const navItems = [
        { name: 'Profile', path: '/dashboard/adminDashboard' },
        { name: 'Stats', path: '/dashboard/adminDashboard/stats' },
        { name: 'Admin', path: '/dashboard/adminDashboard/admin' },
        { name: 'Manage Users', path: '/dashboard/adminDashboard/manage-users' }
    ];

    return (
        <aside className="w-1/5 bg-white shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
            <nav>
                <ul>
                    {navItems.map((item) => (
                        <li key={item.name} className="mb-4">
                            <Link
                                to={item.path}
                                className={`block px-4 py-2 rounded-lg ${
                                    location.pathname === item.path
                                        ? 'bg-purple-700 text-white'
                                        : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                                }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default AdminNavbar;
