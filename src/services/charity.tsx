import { API_URLS } from "../config/api";

async function performCreateCharity(
  charityData: { name: string; description: string; goal: string },
  token: string
): Promise<any> {
  const storedUser = localStorage.getItem("user");
  let user_id = 0;

  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
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
    throw new Error(`Creation failed: ${error}`);
  }
}

async function performGetCharity(
  id: string | undefined,
  token: string
): Promise<any> {
  try {
    let url = API_URLS.CHARITIES;
    if (id) {
      url = `${API_URLS.CHARITIES}/${id}`;
    }

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
    throw new Error(`Getting charities failed: ${error}`);
  }
}

export const CREATE_CHARITY = async (charityData: {
  name: string;
  description: string;
  goal: string;
}): Promise<any> => {
  const storedUser = localStorage.getItem("user");
  let token = "";

  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    token = parsedUser.token;
  }

  return performCreateCharity(charityData, token);
};

export const GET_CHARITY = async (id?: string): Promise<any> => {
  const storedUser = localStorage.getItem("user");
  let token = "";

  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    token = parsedUser.token;
  }

  return performGetCharity(id, token);
};
