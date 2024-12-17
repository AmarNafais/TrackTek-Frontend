import axios from "axios";

const BASE_URL = "http://192.168.1.41:8080/v1";

export const addNotification = async (notificationData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.post(
            `${BASE_URL}/Notification/Create`,
            notificationData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to add notification. Please try again.";
        throw new Error(errorMessage);
    }
};