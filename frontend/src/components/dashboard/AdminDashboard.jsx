import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import AdminNav from "./AdminNav";
import AdminNavbar from "./AdminNavbar";
import { setAdmin } from "@/redux/authadminSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!admin) {
        try {
          const response = await axios.get("/api/admin/data", { withCredentials: true });
          dispatch(setAdmin(response.data.admin));
        } catch (error) {
          console.error("Error fetching admin data:", error.response?.data?.message || error.message);
        }
      }
    };

    fetchAdminData();
  }, [admin, dispatch]);

  if (!admin) {
    return <p>Loading admin data...</p>;
  }

  return (
    <div>
      <AdminNav />
      <div className="min-h-screen bg-white flex">
        <AdminNavbar />
        <main className="flex-grow bg-gray-50 p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Informations</h1>
          <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center md:w-1/3">
              <div className="w-32 h-32 rounded-full border-4 border-gray-200">
                <img src="/logo-01.png" alt="Profile" className="rounded-full" />
              </div>
              <button className="mt-4 text-sm text-blue-500 hover:underline">Edit</button>
            </div>
            <div className="mt-6 md:mt-0 md:ml-8 md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Username:</p>
                  <p className="text-lg font-medium text-gray-800">{admin.fullname}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email:</p>
                  <p className="text-lg font-medium text-gray-800">{admin.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Join Date:</p>
                  <p className="text-lg font-medium text-gray-800">
                    {new Date(admin.createdAt).toLocaleDateString()}
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