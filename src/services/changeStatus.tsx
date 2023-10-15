import { API_URLS } from "../config/api";
// import { useLocalStorage } from "../hooks/useLocalStorage";
// Define an asynchronous function for user login
export const CHANGE_STATUS = async (statusData: {
  status: string;
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

  const data = {
    status: statusData.status,
  };
  // console.log("story", data);

  try {
    // Send a POST request to the login API endpoint with user credentials
    const response = await fetch(
      `${API_URLS.CHARITIES}/${statusData.charity_id}/change_status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Charity Status change failed");
    }

    const storyRes = await response.json();

    return storyRes;
  } catch (error) {
    throw new Error("Status change  failed");
  }
};
