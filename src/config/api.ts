// api.js
// const API_BASE_URL = 'https://donation-api-2ler.onrender.com';
const API_BASE_URL = 'https://donation-platform-api.onrender.com';
// const API_BASE_URL = 'http://127.0.0.1:3000';

export const API_URLS = {
  LOGIN: `${API_BASE_URL}/login`,
  SINGUP: `${API_BASE_URL}/register`,
  CHARITIES: `${API_BASE_URL}/charities`,
  STORIES: `${API_BASE_URL}/charities`,
  DONATE: `${API_BASE_URL}/donate`,
  // ...other API endpoints
};

export default API_BASE_URL;
