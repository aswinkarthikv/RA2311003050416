import { API_BASE_URL, ACCESS_TOKEN } from '../config';

/**
 * Abstract utility wrapper for API calls
 * Helps keep fetch logic centralized and reusable.
 */
export const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    ...(options.headers || {})
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API call failed with status: ${response.status}`);
  }

  // Handle empty responses
  if (response.status === 204) return null;
  
  return response.json();
};
