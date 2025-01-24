import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create a Context
export const UserContext = createContext();

// Create a custom hook to access the context easily
export const useUserContext = () => useContext(UserContext);

// Create a provider component to wrap your application
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);  // Start with null instead of a default string

  useEffect(() => {
    // Example: Fetch the userId from an API, localStorage, or authentication service
    const fetchUserId = async () => {
      const storedUserId = await getUserIdFromAPI(); // Replace with actual fetching logic
      setUserId(storedUserId);
    };

    fetchUserId();
  }, []);  // Run once on mount

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

// Validate children prop using PropTypes
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,  // Ensures that 'children' is passed
};

// Mock function to simulate fetching userId (replace with real logic)
const getUserIdFromAPI = async () => {
  // Example: Simulate fetching the user ID from an API or authentication
  return 'actual-user-id'; // Replace with real user ID fetching logic
};
