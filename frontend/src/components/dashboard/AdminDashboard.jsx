import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAdmin } from "@/redux/authadminSlice"; // Ensure this import path is correct
import { ADMIN_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.authadmin?.admin);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock credentials
  const adminEmail = "admin@admin.com";
  const adminPassword = "sarathi123";

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!admin) {
        // Simulate a check for credentials
        const currentEmail = localStorage.getItem("adminEmail");
        const currentPassword = localStorage.getItem("adminPassword");

        if (currentEmail === adminEmail && currentPassword === adminPassword) {
          // Simulate a successful login (usually would be done via API call)
          dispatch(setAdmin({ email: adminEmail, fullname: "Admin", profileImage: "/logo-01.png", createdAt: new Date() }));
        } else {
          console.error("Invalid credentials");
          navigate("/adminlogin"); // Redirect to login if invalid credentials
        }
      }
    };

    fetchAdminData();
  }, [admin, dispatch, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${ADMIN_API_END_POINT}/getAdminDashboardData`, {
          withCredentials: true, // Ensure credentials are included with the request
        });

        setDashboardData(res.data.data); // Store dashboard data in state
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    if (admin) {
      fetchDashboardData();
    }
  }, [admin]);

  if (loading) {
    return <div>Loading...</div>; // Display loading text or a spinner while fetching data
  }

  if (!dashboardData) {
    return <div>No dashboard data available</div>; // Handle case when no data is retrieved
  }

  return (
    <div>
      <AdminNav />
      <div className="min-h-screen bg-white flex">
        <AdminNavbar />
        <main className="flex-grow bg-gray-50 p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Admin Dashboard
          </h1>
          <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center md:w-1/3">
              <div className="w-32 h-32 rounded-full border-4 border-gray-200">
                <img
                  src={admin.profileImage || "/logo-01.png"} // Use profile image from admin data if available
                  alt="Profile"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="mt-6 md:mt-0 md:ml-8 md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Username:</p>
                  <p className="text-lg font-medium text-gray-800">
                    {admin.fullname || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email:</p>
                  <p className="text-lg font-medium text-gray-800">
                    {admin.email || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role:</p>
                  <p className="text-lg font-medium text-gray-800">Admin</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Join Date:</p>
                  <p className="text-lg font-medium text-gray-800">
                    {admin.createdAt
                      ? new Date(admin.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
