import axios from "axios";

const BASE_URL = "http://192.168.1.41:8080/v1";

export const fetchOrders = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.get(`${BASE_URL}/Order/GetAll`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to fetch orders. Please try again.";
        throw new Error(errorMessage);
    }
};

export const addOrder = async (orderData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.post(`${BASE_URL}/Order/Create`, orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to add order. Please try again.";
        throw new Error(errorMessage);
    }
};

export const updateOrder = async (orderData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.put(`${BASE_URL}/Order/Update`, orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to update order. Please try again.";
        throw new Error(errorMessage);
    }
};

export const deleteOrder = async (orderId) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        await axios.delete(`${BASE_URL}/Order/Delete?id=${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to delete order. Please try again.";
        throw new Error(errorMessage);
    }
};