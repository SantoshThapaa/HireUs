import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create a Context
export const UserContext = createContext();

// Create a custom hook to access the context easily
export const useUserContext = () => useContext(UserContext);

// Create a provider component to wrap your application
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('your-user-id');  // Set the default or fetch userId from somewhere

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
