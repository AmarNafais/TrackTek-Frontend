import axios from "axios";

const BASE_URL = "http://192.168.1.41:8080/v1";

export const requestPasswordReset = async (email) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send POST request with the token in the Authorization header and email as query parameter
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

    return response.data; // Return the response message from the API
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to request password reset. Please try again.";
    throw new Error(errorMessage);
  }
};

/**
 * Verifies the reset code and updates the user's password via the backend API.
 * @param {Object} resetData - The data required for resetting the password.
 * @param {string} resetData.email - The user's email address.
 * @param {string} resetData.newPassword - The new password to set.
 * @param {string} resetData.confirmPassword - The confirmation of the new password.
 * @param {string} resetData.code - The verification code sent to the user's email.
 * @returns {Promise<Object>} - A success message or relevant response from the API.
 */
export const resetPassword = async ({ email, newPassword, confirmPassword, code }) => {
  try {
    // Send POST request to reset the password
    const response = await axios.post(
      `${BASE_URL}/Auth/ResetPassword`,
      {}, // Empty body
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

    return response.data; // Return the success message or API response
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to reset password. Please try again.";
    throw new Error(errorMessage);
  }
};
