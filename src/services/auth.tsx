import { User } from "../hooks/useUser";
import { API_URLS } from "../config/api";

// Define an asynchronous function for user login
export const LOGIN_USER = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    // Send a POST request to the login API endpoint with user credentials
    const response = await fetch(API_URLS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials), // Convert credentials to JSON format
    });

    // Check if the response is not OK (HTTP status code other than 200)
    if (!response.ok) {
      throw new Error("Login failed"); // Throw an error if login fails
    }

    // Parse the response data as JSON to get user information
    const userData = await response.json();

    // Construct a User object with relevant properties from the response
    const user: User = {
      firstname: userData.firstname,
      secondname: userData.secondname,
      email: credentials.email, // Use the provided email from credentials
      role: userData.role,
      token: userData.token,
    };

    // Return the constructed User object
    return user;
  } catch (error) {
    // Handle any errors that occur during the login process
    throw new Error("Login failed"); // Throw an error if login fails
  }
};

// Define an asynchronous function for user signup
export const SIGNUP_USER = async (credentials: {
  email: string;
  password: string;
  firstname: string;
  secondname: string;
  role: string;
}) => {
  try {
    // Send a POST request to the login API endpoint with user credentials
    const response = await fetch(API_URLS.SINGUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials), // Convert credentials to JSON format
    });

    // Check if the response is not OK (HTTP status code other than 200)
    if (!response.ok) {
      throw new Error("Signup failed"); // Throw an error if login fails
    }

    // Parse the response data as JSON to get user information
    const userData = await response.json();

    // Construct a User object with relevant properties from the response
    const user: User = {
      firstname: userData.firstname,
      secondname: userData.secondname,
      email: credentials.email, // Use the provided email from credentials
      role: userData.role,
      token: userData.token,
    };

    // Return the constructed User object
    return user;
  } catch (error) {
    // Handle any errors that occur during the login process
    throw new Error("Singup failed"); // Throw an error if login fails
  }
};
