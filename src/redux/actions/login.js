import axios from "axios";

const BASE_URL = "http://192.168.1.41:8080/v1";

export const requestPasswordReset = async (email) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token not found. Please login again.");
        }
        const response = await axios.post(
            `${BASE_URL}/Auth/RequestPasswordReset`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                params: {
                    email,
                },
            }
        );
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to request password reset. Please try again.";
        throw new Error(errorMessage);
    }
};

export const resetPassword = async ({ email, newPassword, confirmPassword, code }) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/Auth/ResetPassword`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    email,
                    newPassword,
                    confirmPassword,
                    code,
                },
            }
        );
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Failed to reset password. Please try again.";
        throw new Error(errorMessage);
    }
};
