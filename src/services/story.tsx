import { API_URLS } from "../config/api";
// import { useLocalStorage } from "../hooks/useLocalStorage";
// Define an asynchronous function for user login
export const CREATE_STORY = async (storyData: {
  name: string;
  description: string;
  image_url: string;
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
    ...storyData,
    // image_url:
    //   "https://images.unsplash.com/photo-1550751187-da63f7e2b4eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
  };
  // console.log("story", data);

  try {
    // Send a POST request to the login API endpoint with user credentials
    const response = await fetch(
      `${API_URLS.CHARITIES}/${storyData.charity_id}/stories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Charity creation failed");
    }

    const storyRes = await response.json();

    return storyRes;
  } catch (error) {
    throw new Error("Creation failed");
  }
};

export const GET_STORY = async (charity_id: string | undefined) => {
  // console.log("story", data);

  try {
    // Send a POST request to the login API endpoint with user credentials
    const response = await fetch(
      `${API_URLS.CHARITIES}/${charity_id}/stories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Charity creation failed");
    }

    const storyRes = await response.json();

    return storyRes;
  } catch (error) {
    throw new Error("Creation failed");
  }
};

export const GET_DONOR = async (charity_id: string | undefined) => {
  // console.log("story", data);

  try {
    // Send a POST request to the login API endpoint with user credentials
    const response = await fetch(
      `${API_URLS.CHARITIES}/${charity_id}/donations`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Charity creation failed");
    }

    const storyRes = await response.json();

    return storyRes;
  } catch (error) {
    throw new Error("Creation failed");
  }
};
