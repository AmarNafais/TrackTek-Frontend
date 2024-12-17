import axios from "axios";

const BASE_URL = "http://192.168.1.41:8080/v1";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/Auth/Login`,
            {},
            {
                params: {
                    email,
                    password,
                },
            }
        );
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "An error occurred. Please try again.";
        throw new Error(errorMessage);
    }
};

export const fetchUsers = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.get(`${BASE_URL}/User/GetAllUsers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to fetch users. Please try again.";
        throw new Error(errorMessage);
    }
};

export const addUser = async (userData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.post(`${BASE_URL}/User/CreateUser`, userData, {
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
                : "Failed to add user. Please try again.";
        throw new Error(errorMessage);
    }
};


export const updateUser = async (userData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.post(`${BASE_URL}/User/UpdateUser`, userData, {
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
                : "Failed to update user. Please try again.";
        throw new Error(errorMessage);
    }
};

export const updateUserStatus = async (userId, isActive) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.put(
            `${BASE_URL}/User/UpdateUserStatus`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                params: {
                    userId,
                    isActive,
                },
            }
        );
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to update user status. Please try again.";
        throw new Error(errorMessage);
    }
};