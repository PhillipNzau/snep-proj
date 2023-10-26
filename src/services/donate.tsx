import { API_URLS } from "../config/api";
// Define an asynchronous function for user donation
export const DONATE = async (donationData: {
  user_id?: number;
  amount?: string;
  is_anonymous?: boolean;
  charity_id?: string;
}) => {
  const storedUser = localStorage.getItem("user"); // Use localStorage directly

  let token = "";
  // let charity_id = 0;

  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    token = parsedUser.token;
    // charity_id = parseInt(parsedUser.id, 10);
  }
  console.log("well", donationData);

  try {
    // Send a POST request to the donation API endpoint with user credentials
    const response = await fetch(
      `${API_URLS.CHARITIES}/${donationData.charity_id}/donations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(donationData), // Convert credentials to JSON format
      }
    );
    // Check if the response is not OK (HTTP status code other than 200)
    if (!response.ok) {
      throw new Error("Donation failed");
    }

    // Parse the response data as JSON to get user information
    const donationRes = await response.json();
    console.log("res donation", donationRes);

    return donationRes;
  } catch (error) {
    // Handle any errors that occur during the donation process
    throw new Error("Donation failed");
  }
};
