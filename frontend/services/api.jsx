import { API_URL } from './config';

export const API_CONFIG = {
    BASE_URL: API_URL,
    headers: {
      accept: "application/json",
    },
};

export const fetchRestaurants = async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/restaurant/`, {
        method: "GET",
        headers: API_CONFIG.headers,
    });
    if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
    }
    const data = await response.json();
    return data;
    
}

