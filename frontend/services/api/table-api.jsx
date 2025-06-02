import { API_URL } from '../config';
import { api } from '../axios/user';

export const API_CONFIG = {
    BASE_URL: API_URL,
    headers: {
      accept: "application/json",
    },
};

export const postTableBooking = async ({
    restaurantId,
    name,
    phone,
    email,
    date,
    people,
    tableReservationTime,
}) => {
    try {
        const response = await api.post(`${API_CONFIG.BASE_URL}/api/table`,
            {
                restaurantId,
                name,
                phone,
                email,
                date,
                people,
                tableReservationTime,
            },
        );
        return response.data;
    } catch (error) {
        // Lấy message từ API nếu có
        const apiMessage = error.response?.data?.message || error.message;
        throw new Error(apiMessage);
    }
}