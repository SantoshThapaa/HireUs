// Import necessary modules
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
// import NotFound from "./components/NotFound"; // Import the NotFound component
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import i18next from './i18n'; // Import your i18n configuration
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Services from "./components/admin/Services";
import ServicesCreate from "./components/admin/ServicesCreate";
import ServicesSetup from "./components/admin/ServicesSetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import AdminLogin from "./components/auth/Adminlogin";
import AdminSignup from "./components/auth/AdminSignup";
import Stats from "./components/dashboard/Stats";
import Admin from "./components/dashboard/Admin";
// Set up routes
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },
  //dashboard part here
  {
    path: '/adminlogin',
    element: <AdminLogin />
  },
  {
    path: '/adminsignup',
    element: <AdminSignup />
  },
  {
    path: '/dashboard/adminDashboard',
    element: <AdminDashboard />
  },
  {
    path: '/dashboard/adminDashboard/stats',
    element: <Stats/>
  },
  
  {
    path: '/dashboard/adminDashboard/admin',
    element: <Admin/>
  },
  //admin part here
  {
    path: '/admin/services',
    element: <Services />
  },
  {
    path: '/admin/services/create',
    element: <ServicesCreate />
  },
  {
    path: '/admin/services/:id',
    element: <ServicesSetup />
  },
  {
    path: '/admin/jobs',
    element: <AdminJobs />
  },
  {
    path: '/admin/jobs/create',
    element: <PostJob />
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <Applicants />
  },
  {
    path: '/admin/jobs/:id/recommendations',
    element: <Applicants />
  }
]);

// Define App component
function App() {
  return (
    <I18nextProvider i18n={i18next}> {/* Wrap with I18nextProvider */}
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </I18nextProvider>
  );
}

export default App;
