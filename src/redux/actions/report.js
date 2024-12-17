import axios from "axios";

const BASE_URL = "http://192.168.1.41:8080/v1";

export const fetchReports = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.get(`${BASE_URL}/Report/GetAll`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to fetch reports. Please try again.";
        throw new Error(errorMessage);
    }
};


export const fetchReportByOrderId = async (orderId) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.get(`${BASE_URL}/Report/GetByOrderId`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                orderId,
            },
        });
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to fetch report by order ID. Please try again.";
        throw new Error(errorMessage);
    }
};