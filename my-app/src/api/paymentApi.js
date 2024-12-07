import axios from './axios'; // Import configured Axios instance

// Create Order
export const createOrder = async (amount) => {
  try {
    const response = await axios.post('/create-order', { amount });
    return response.data.orderId; // Return the created order ID
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Capture Order
export const captureOrder = async (orderId) => {
  try {
    const response = await axios.post('/capture-order', { orderId });
    return response.data; // Return capture details
  } catch (error) {
    console.error('Error capturing order:', error);
    throw error;
  }
};