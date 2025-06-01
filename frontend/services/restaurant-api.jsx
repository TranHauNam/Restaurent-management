import { API_URL } from './config';
import { api } from './axios/user';

export const API_CONFIG = {
    BASE_URL: API_URL,
    headers: {
      accept: "application/json",
    },
};

// no neeed token - normal fetch
export const fetchRestaurants = async () => {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/api/restaurant/`, {
            method: "GET",
            headers: API_CONFIG.headers,
        });
        if (!response.ok) {
            throw new Error("Failed to fetch restaurants");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        throw error;
    }
}

export const fetchRestaurantById = async (id) => {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/api/restaurant/${id}`, {
            method: "GET",
            headers: API_CONFIG.headers,
        });
        if (!response.ok) {
            throw new Error("Failed to fetch restaurant");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching restaurant by id:", error);
        throw error;
    }
}

//need token
// Lay khung gio dat ban - get Time Slots
export const postAvailableTime = async ({restaurantId, date, time, people}) => {
    try {
        const response = await api.post(
            "/api/restaurant/available-times",
            { restaurantId, date, time, people }
        );
        return response.data;
    } catch (error) {
        console.error("postAvailableTime error:", error);
        throw error;
    }
}




