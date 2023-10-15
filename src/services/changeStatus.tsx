import { API_URLS } from "../config/api";

async function performStatusChange(
  statusData: { status: string; charity_id?: string },
  token: string
): Promise<any> {
  const data = {
    status: statusData.status,
  };

  try {
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
      throw new Error(`Status change failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Status change failed: ${error}`);
  }
}

export const CHANGE_STATUS = async (statusData: {
  status: string;
  charity_id?: string;
}): Promise<any> => {
  const storedUser = localStorage.getItem("user");
  let token = "";

  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    token = parsedUser.token;
  }

  return performStatusChange(statusData, token);
};
