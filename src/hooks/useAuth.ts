import { useEffect } from "react";
import { useUser, User } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";

// Create a custom hook for authentication-related functions
export const useAuth = () => {
  // Use the useUser hook to access user-related data and functions
  const { user, addUser, removeUser } = useUser();
  // Use the useLocalStorage hook to access local storage functions
  const { getItem } = useLocalStorage();

  // Use the useEffect hook to load the user data from local storage when the component mounts
  useEffect(() => {
    // Retrieve user data from local storage
    const user = getItem("user");
    // If user data exists in local storage, add it to the context
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  // Define a function to handle user login
  const login = (user: User) => {
    // Add the user to the context and local storage
    addUser(user);
  };

  // Define a function to handle user logout
  const logout = () => {
    // Remove the user from the context and local storage
    removeUser();
  };

  // Define a function to set user data
  const setUser = (user: User | null) => {
    // Add or remove user data based on the provided user object
    addUser(user);
  };

  // Return user-related functions and data as an object
  return { user, login, logout, setUser };
};
