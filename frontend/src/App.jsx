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
