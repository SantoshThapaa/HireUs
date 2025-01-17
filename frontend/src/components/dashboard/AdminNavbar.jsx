import { useLocation, Link } from "react-router-dom";

const AdminNavbar = () => {
    const location = useLocation(); // Get the current location
    
    // Define the navigation items
    const navItems = [
        { name: 'Profile', path: '/dashboard/adminDashboard' },
        { name: 'Stats', path: '/dashboard/adminDashboard/stats' },
        { name: 'Admin', path: '/dashboard/adminDashboard/admin' },
        { name: 'Manage Users', path: '/dashboard/adminDashboard/manageUsers' },
        { name: 'Manage Services', path: '/dashboard/adminDashboard/manageServices' }
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
                                        ? 'bg-[#45cfc1] text-white'  // Active link color
                                        : 'text-gray-700 hover:bg-[#45cfc1] hover:text-white' // Inactive link color
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
