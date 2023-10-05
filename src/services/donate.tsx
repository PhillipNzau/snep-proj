import { API_URLS } from "../config/api";
import { useLocalStorage } from "../hooks/useLocalStorage";
// Define an asynchronous function for user login
export const DONATE = async (donationData: {
  interval: string;
  amount: string;
  anonymous: string;
}) => {
  const { getItem } = useLocalStorage();
  const storedUser = getItem("user");
  let token = "";
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    token = parsedUser.token;
  }
  try {
    // Send a POST request to the login API endpoint with user credentials
    const response = await fetch(API_URLS.DONATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(donationData), // Convert credentials to JSON format
    });
    // Check if the response is not OK (HTTP status code other than 200)
    if (!response.ok) {
      throw new Error("Donation failed");
    }

    // Parse the response data as JSON to get user information
    const donationRes = await response.json();
    console.log("res donation", donationRes);

    return donationRes;
  } catch (error) {
    // Handle any errors that occur during the login process
    throw new Error("Login failed");
  }
};
