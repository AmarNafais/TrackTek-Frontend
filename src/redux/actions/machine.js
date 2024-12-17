import axios from "axios";

const BASE_URL = "http://192.168.1.41:8080/v1";

export const fetchMachines = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.get(`${BASE_URL}/Machine/GetAll`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to fetch machines. Please try again.";
        throw new Error(errorMessage);
    }
};

export const addMachine = async (machineData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.post(`${BASE_URL}/Machine/Create`, machineData, {
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
                : "Failed to add machine. Please try again.";
        throw new Error(errorMessage);
    }
};

export const updateMachine = async (machineData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.put(`${BASE_URL}/Machine/Update`, machineData, {
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
                : "Failed to update machine. Please try again.";
        throw new Error(errorMessage);
    }
};

export const deleteMachine = async (id) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        await axios.delete(`${BASE_URL}/Machine/Delete?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to delete machine. Please try again.";
        throw new Error(errorMessage);
    }
};