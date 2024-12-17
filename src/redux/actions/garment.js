import axios from "axios";

const BASE_URL = "http://192.168.1.41:8080/v1";

export const fetchGarments = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.get(`${BASE_URL}/Garment/GetAll`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to fetch garments. Please try again.";
        throw new Error(errorMessage);
    }
};

export const addGarment = async (garmentData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.post(`${BASE_URL}/Garment/Create`, garmentData, {
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
                : "Failed to add garment. Please try again.";
        throw new Error(errorMessage);
    }
};

export const updateGarment = async (garmentData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.put(`${BASE_URL}/Garment/Update`, garmentData, {
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
                : "Failed to update garment. Please try again.";
        throw new Error(errorMessage);
    }
};

export const deleteGarment = async (id) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        await axios.delete(`${BASE_URL}/Garment/Delete?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to delete garment. Please try again.";
        throw new Error(errorMessage);
    }
};