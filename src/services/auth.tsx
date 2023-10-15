import { User } from "../hooks/useUser";
import { API_URLS } from "../config/api";

async function performUserAction(
  endpoint: string,
  credentials: Record<string, string>
): Promise<User> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Operation failed: ${response.statusText}`);
    }

    const userData = await response.json();

    const user: User = {
      id: userData.user.id,
      first_name: userData.user.first_name,
      last_name: userData.user.last_name,
      email: userData.user.email,
      role: userData.user.role,
      token: userData.access_token,
    };

    return user;
  } catch (error) {
    throw new Error(`Operation failed: ${error}`);
  }
}

export const LOGIN_USER = async (credentials: {
  email: string;
  password: string;
}): Promise<User> => {
  return performUserAction(API_URLS.LOGIN, credentials);
};

export const SIGNUP_USER = async (credentials: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
}): Promise<User> => {
  return performUserAction(API_URLS.SINGUP, credentials);
};
