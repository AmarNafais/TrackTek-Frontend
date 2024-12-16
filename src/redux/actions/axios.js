import axios from "axios";

const BASE_URL = "http://192.168.1.41:8080/v1";

/**
 * Sends a login request to the backend API.
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @returns {Promise<Object>} - Response data from the API.
 */
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

/**
 * Fetches the list of all users from the backend API with authentication.
 * @returns {Promise<Array>} - Array of user objects from the API.
 */
export const fetchUsers = async () => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send request with the token in the Authorization header
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

/**
 * Fetches the list of all machines from the backend API with authentication.
 * @returns {Promise<Array>} - Array of machine objects from the API.
 */
export const fetchMachines = async () => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send request with the token in the Authorization header
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

/**
 * Adds a new machine to the backend API with authentication.
 * @param {Object} machineData - The machine object to add.
 * @param {string} machineData.name - The name of the machine.
 * @param {string} machineData.machineType - The type of the machine.
 * @param {string} machineData.machineStatus - The status of the machine ("Active" or "InActive").
 * @returns {Promise<Object>} - The newly created machine object from the API.
 */
export const addMachine = async (machineData) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send POST request with the token in the Authorization header and machine data in the body
    const response = await axios.post(`${BASE_URL}/Machine/Create`, machineData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return the response data (newly created machine)
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to add machine. Please try again.";
    throw new Error(errorMessage);
  }
};

/**
 * Updates an existing machine in the backend API with authentication.
 * @param {Object} machineData - The machine object to update.
 * @param {number} machineData.id - The ID of the machine to update.
 * @param {string} machineData.name - The updated name of the machine.
 * @param {string} machineData.machineType - The updated type of the machine.
 * @param {string} machineData.machineStatus - The updated status of the machine ("Active" or "InActive").
 * @returns {Promise<Object>} - The updated machine object from the API.
 */
export const updateMachine = async (machineData) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send PUT request with the token in the Authorization header and machine data in the body
    const response = await axios.put(`${BASE_URL}/Machine/Update`, machineData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return the response data (updated machine)
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to update machine. Please try again.";
    throw new Error(errorMessage);
  }
};

/**
 * Deletes a machine in the backend API with authentication.
 * @param {number} id - The ID of the machine to delete.
 * @returns {Promise<void>} - Resolves if the machine is successfully deleted.
 */
export const deleteMachine = async (id) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send DELETE request with the token in the Authorization header
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

/**
 * Fetches the list of all garments from the backend API with authentication.
 * @returns {Promise<Array>} - Array of garment objects from the API.
 */
export const fetchGarments = async () => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send request with the token in the Authorization header
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

/**
 * Adds a new garment to the backend API with authentication.
 * @param {Object} garmentData - The garment object to add.
 * @param {string} garmentData.name - The name of the garment.
 * @param {string} garmentData.design - The URL of the garment design.
 * @param {string} garmentData.category - The category of the garment.
 * @param {Array<string>} garmentData.sizes - Array of sizes available for the garment.
 * @param {number} garmentData.basePrice - The base price of the garment.
 * @param {string} garmentData.garmentStatus - The status of the garment ("Available" or "Discontinued").
 * @param {number} garmentData.laborHoursPerUnit - The labor hours per unit of the garment.
 * @param {number} garmentData.hourlyLaborRate - The hourly labor rate for the garment.
 * @returns {Promise<Object>} - The newly created garment object from the API.
 */
export const addGarment = async (garmentData) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send POST request with the token in the Authorization header and garment data in the body
    const response = await axios.post(`${BASE_URL}/Garment/Create`, garmentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return the response data (newly created garment)
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to add garment. Please try again.";
    throw new Error(errorMessage);
  }
};

/**
 * Updates an existing garment in the backend API with authentication.
 * @param {Object} garmentData - The garment object to update.
 * @param {number} garmentData.id - The ID of the garment to update.
 * @param {string} garmentData.name - The updated name of the garment.
 * @param {string} garmentData.design - The updated URL of the garment design.
 * @param {string} garmentData.categoryType - The updated category of the garment.
 * @param {Array<string>} garmentData.sizes - Array of updated sizes available for the garment.
 * @param {number} garmentData.basePrice - The updated base price of the garment.
 * @param {string} garmentData.garmentStatus - The updated status of the garment ("Available" or "Discontinued").
 * @param {number} garmentData.laborHoursPerUnit - The updated labor hours per unit of the garment.
 * @param {number} garmentData.hourlyLaborRate - The updated hourly labor rate for the garment.
 * @returns {Promise<Object>} - The updated garment object from the API.
 */
export const updateGarment = async (garmentData) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send PUT request with the token in the Authorization header and garment data in the body
    const response = await axios.put(`${BASE_URL}/Garment/Update`, garmentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return the response data (updated garment)
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to update garment. Please try again.";
    throw new Error(errorMessage);
  }
};

/**
 * Deletes a garment from the backend API with authentication.
 * @param {number} id - The ID of the garment to delete.
 * @returns {Promise<void>} - Resolves if the garment is successfully deleted.
 */
export const deleteGarment = async (id) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send DELETE request with the token in the Authorization header
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

/**
 * Fetches the list of all materials from the backend API with authentication.
 * @returns {Promise<Array>} - Array of material objects from the API.
 */
export const fetchMaterials = async () => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send request with the token in the Authorization header
    const response = await axios.get(`${BASE_URL}/Material/GetAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Return the material data from the response
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to fetch materials. Please try again.";
    throw new Error(errorMessage);
  }
};

/**
 * Adds a new material to the backend API with authentication.
 * @param {Object} materialData - The material object to add.
 * @param {string} materialData.name - The name of the material.
 * @param {number} materialData.unitCost - The cost per unit of the material.
 * @param {number} materialData.quantity - The quantity of the material.
 * @param {string} materialData.unitOfMeasurement - The unit of measurement for the material.
 * @returns {Promise<Object>} - The newly created material object from the API.
 */
export const addMaterial = async (materialData) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send POST request with the token in the Authorization header and material data in the body
    const response = await axios.post(`${BASE_URL}/Material/Create`, materialData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return the newly created material from the response
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to add material. Please try again.";
    throw new Error(errorMessage);
  }
};

/**
 * Updates an existing material in the backend API with authentication.
 * @param {Object} materialData - The material object to update.
 * @param {number} materialData.id - The ID of the material to update.
 * @param {string} materialData.name - The updated name of the material.
 * @param {number} materialData.unitCost - The updated cost per unit of the material.
 * @param {number} materialData.quantityInStock - The updated quantity of the material.
 * @param {string} materialData.unit - The updated unit of measurement for the material.
 * @returns {Promise<Object>} - The updated material object from the API.
 */
export const updateMaterial = async (materialData) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send PUT request with the token in the Authorization header and material data in the body
    const response = await axios.put(`${BASE_URL}/Material/Update`, materialData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return the updated material from the response
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to update material. Please try again.";
    throw new Error(errorMessage);
  }
};

/**
 * Deletes a material from the backend API with authentication.
 * @param {number} id - The ID of the material to delete.
 * @returns {Promise<void>} - Resolves if the material is successfully deleted.
 */
export const deleteMaterial = async (id) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send DELETE request with the token in the Authorization header
    await axios.delete(`${BASE_URL}/Material/Delete?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to delete material. Please try again.";
    throw new Error(errorMessage);
  }
};


/**
 * Fetches the list of all customers from the backend API with authentication.
 * @returns {Promise<Array>} - Array of customer objects from the API.
 */
export const fetchCustomers = async () => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send request with the token in the Authorization header
    const response = await axios.get(`${BASE_URL}/Customer/GetAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Return the customer data from the response
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to fetch customers. Please try again.";
    throw new Error(errorMessage);
  }
};

/**
 * Adds a new customer to the backend API with authentication.
 * @param {Object} customerData - The customer object to add.
 * @param {string} customerData.customerName - The name of the customer.
 * @param {string} customerData.customerEmail - The email of the customer.
 * @param {string} customerData.contactNumber - The contact number of the customer.
 * @param {string} customerData.address - The address of the customer.
 * @param {boolean} customerData.isActive - The active status of the customer.
 * @returns {Promise<Object>} - The newly created customer object from the API.
 */
export const addCustomer = async (customerData) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send POST request with the token in the Authorization header and customer data in the body
    const response = await axios.post(`${BASE_URL}/Customer/Create`, customerData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return the newly created customer from the response
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to add customer. Please try again.";
    throw new Error(errorMessage);
  }
};

/**
 * Updates an existing customer in the backend API with authentication.
 * @param {Object} customerData - The customer object to update.
 * @param {number} customerData.id - The ID of the customer to update.
 * @param {string} customerData.customerName - The updated name of the customer.
 * @param {string} customerData.customerEmail - The updated email of the customer.
 * @param {string} customerData.contactNumber - The updated contact number of the customer.
 * @param {string} customerData.address - The updated address of the customer.
 * @param {boolean} customerData.isActive - The updated active status of the customer.
 * @returns {Promise<Object>} - The updated customer object from the API.
 */
export const updateCustomer = async (customerData) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send PUT request with the token in the Authorization header and customer data in the body
    const response = await axios.put(`${BASE_URL}/Customer/Update`, customerData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return the updated customer from the response
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to update customer. Please try again.";
    throw new Error(errorMessage);
  }
};

/**
 * Deletes an existing customer in the backend API with authentication.
 * @param {number} id - The ID of the customer to delete.
 * @returns {Promise<void>} - Resolves if the deletion is successful.
 */
export const deleteCustomer = async (id) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send DELETE request with the token in the Authorization header and customer ID as a query parameter
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

/**
 * Fetches the list of all orders from the backend API with authentication.
 * @returns {Promise<Array>} - Array of order objects from the API.
 */
export const fetchOrders = async () => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send request with the token in the Authorization header
    const response = await axios.get(`${BASE_URL}/Order/GetAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Return the order data from the response
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to fetch orders. Please try again.";
    throw new Error(errorMessage);
  }
};

/**
 * Adds a new order to the backend API with authentication.
 * @param {Object} orderData - The order object to add.
 * @param {number} orderData.customerId - The ID of the customer placing the order.
 * @param {string} orderData.orderDate - The date the order was placed.
 * @param {string} orderData.dueDate - The due date for the order.
 * @param {number} orderData.totalCost - The total cost of the order.
 * @param {number} orderData.orderStatus - The status of the order (1: Pending, 2: In Progress, etc.).
 * @param {number} orderData.garmentId - The ID of the garment in the order.
 * @param {number} orderData.quantity - The quantity of the garment.
 * @param {string} orderData.size - The size of the garment.
 * @returns {Promise<Object>} - The newly created order object from the API.
 */
export const addOrder = async (orderData) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send POST request with the token in the Authorization header and order data in the body
    const response = await axios.post(`${BASE_URL}/Order/Create`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return the newly created order from the response
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to add order. Please try again.";
    throw new Error(errorMessage);
  }
};

/**
 * Updates an existing order in the backend API with authentication.
 * @param {Object} orderData - The order object to update.
 * @param {number} orderData.id - The ID of the order to update.
 * @param {number} orderData.customerId - The ID of the customer placing the order.
 * @param {string} orderData.orderDate - The date the order was placed.
 * @param {string} orderData.dueDate - The due date for the order.
 * @param {number} orderData.totalCost - The total cost of the order.
 * @param {number} orderData.orderStatus - The status of the order (1: Pending, 2: In Progress, etc.).
 * @param {number} orderData.garmentId - The ID of the garment in the order.
 * @param {number} orderData.quantity - The quantity of the garment.
 * @param {string} orderData.size - The size of the garment.
 * @returns {Promise<Object>} - The updated order object from the API.
 */
export const updateOrder = async (orderData) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send PUT request with the token in the Authorization header and order data in the body
    const response = await axios.put(`${BASE_URL}/Order/Update`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return the updated order from the response
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to update order. Please try again.";
    throw new Error(errorMessage);
  }
};

/**
 * Deletes an existing order in the backend API with authentication.
 * @param {number} orderId - The ID of the order to delete.
 * @returns {Promise<void>} - Resolves if the order is successfully deleted.
 */
export const deleteOrder = async (orderId) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    // Send DELETE request with the token in the Authorization header
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
