import { API_URLS } from "../config/api";

export const DELETE_CHARITY = async (charityId: { id?: string }) => {
  const storedUser = localStorage.getItem("user");
  let token = "";

  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    token = parsedUser.token;
  }

  try {
    const response = await fetch(`${API_URLS.CHARITIES}/${charityId.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      // Deletion successful, return a success message or null
      return null;
    } else if (response.status === 404) {
      // Handle a 404 Not Found response (charity not found)
      throw new Error("Charity not found");
    } else {
      // Handle other non-successful HTTP status codes
      throw new Error(
        `Charity deletion failed with status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Charity delete error:", error);
    throw new Error("An error occurred while deleting the charity");
  }
};
