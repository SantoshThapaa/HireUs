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

// Set up routes
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
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
    element: <Jobs/> 
  },
  {
    path: '/browse',
    element: <Browse/> 
  },
  {
    path: '/profile',
    element: <Profile/> 
  },
  {
    path: '/description/:id',
    element: <JobDescription/> 
  },

  //admin part here
  {
    path: '/admin/services',
    element: <Services/> 
  },
  {
    path: '/admin/services/create',
    element: <ServicesCreate/> 
  },
  {
    path: '/admin/services/:id',
    element: <ServicesSetup/> 
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
