import axios from "axios";

const BASE_URL = "http://192.168.1.41:8080/v1";

export const fetchCustomers = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }
    const response = await axios.get(`${BASE_URL}/Customer/GetAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to fetch customers. Please try again.";
    throw new Error(errorMessage);
  }
};

export const addCustomer = async (customerData) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }
    const response = await axios.post(`${BASE_URL}/Customer/Create`, customerData, {
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
        : "Failed to add customer. Please try again.";
    throw new Error(errorMessage);
  }
};

export const updateCustomer = async (customerData) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }
    const response = await axios.put(`${BASE_URL}/Customer/Update`, customerData, {
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
        : "Failed to update customer. Please try again.";
    throw new Error(errorMessage);
  }
};

export const deleteCustomer = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }
    await axios.delete(`${BASE_URL}/Customer/Delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id,
      },
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to delete customer. Please try again.";
    throw new Error(errorMessage);
  }
};