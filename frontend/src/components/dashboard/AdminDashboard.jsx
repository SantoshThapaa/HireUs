import { useState } from "react";
import AdminNav from "./AdminNav";
import AdminNavbar from "./AdminNavbar";

const AdminDashboard = () => {
    const [admin, setAdmin] = useState({
        name: "Admin User",
        email: "admin@admin.com",
        role: "Administrator",
        image: "/default-profile.png", // Default profile image
    });
    const [editing, setEditing] = useState(false); // Track editing state
    const [formData, setFormData] = useState({ ...admin });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({ ...formData, image: reader.result }); // Update image preview
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        setAdmin({ ...formData }); // Update admin details
        setEditing(false); // Exit editing mode
    };

    return (
        <div>
            <AdminNav />
            < div className="flex">
            {/* Sidebar (AdminNav) */}
                <AdminNavbar />

            {/* Content Section */}
            <div className="w-2/3 p-6">
                <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
                <div className="bg-white shadow-md rounded p-6">
                    {editing ? (
                        <form onSubmit={handleSave}>
                            <div className="mb-4 text-center">
                                <label htmlFor="image" className="cursor-pointer">
                                    <img
                                        src={formData.image}
                                        alt="Admin Profile"
                                        className="w-32 h-32 rounded-full mx-auto mb-2 object-cover"
                                    />
                                    <input
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>
                                <p className="text-sm text-gray-600">Click image to update</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded mt-4"
                            >
                                Save Changes
                            </button>
                        </form>
                    ) : (
                        <div>
                            <div className="mb-4 text-center">
                                <img
                                    src={admin.image}
                                    alt="Admin Profile"
                                    className="w-32 h-32 rounded-full mx-auto mb-2 object-cover"
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">Name:</p>
                                <p className="text-lg font-medium text-gray-800">{admin.name}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">Email:</p>
                                <p className="text-lg font-medium text-gray-800">{admin.email}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">Role:</p>
                                <p className="text-lg font-medium text-gray-800">{admin.role}</p>
                            </div>
                            <button
                                onClick={() => setEditing(true)}
                                className="w-full bg-blue-500 text-white py-2 rounded mt-4"
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
};

export default AdminDashboard;
