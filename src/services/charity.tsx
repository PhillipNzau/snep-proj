import { API_URLS } from "../config/api";
// import { useLocalStorage } from "../hooks/useLocalStorage";
// Define an asynchronous function for user login
export const CREATE_CHARITY = async (charityData: {
  name: string;
  description: string;
  goal: string;
}) => {
  const storedUser = localStorage.getItem("user"); // Use localStorage directly

  let token = "";
  let user_id = 0;

  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    token = parsedUser.token;
    user_id = parseInt(parsedUser.id, 10);
  }

  const data = {
    charity: {
      ...charityData,
      user_id: user_id,
      image_url:
        "https://plus.unsplash.com/premium_photo-1681492071459-3a45f4289743?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    },
  };
  try {
    // Send a POST request to the login API endpoint with user credentials
    const response = await fetch(API_URLS.CHARITIES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Charity creation failed");
    }

    const charityRes = await response.json();

    return charityRes;
  } catch (error) {
    throw new Error("Creation failed");
  }
};

export const GET_CHARITY = async (id?: string) => {
  const storedUser = localStorage.getItem("user"); // Use localStorage directly

  let token = "";

  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    token = parsedUser.token;
  }

  try {
    let url = API_URLS.CHARITIES;
    if (id) {
      url = `${API_URLS.CHARITIES}/${id}`;
    }

    // Send a POST request to the login API endpoint with user credentials
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Getting charities failed");
    }

    const charityRes = await response.json();

    return charityRes;
  } catch (error) {
    throw new Error("Getting charities failed");
  }
};
