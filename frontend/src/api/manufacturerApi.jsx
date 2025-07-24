import axios from "axios";
const API_URL = "/api/v1/manufacturers"; // Adjust the base URL as needed
export const fetchManufacturers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching manufacturers:", error);
    throw error;
  }
}
export const createManufacturer = async (manufacturerData) => {
  try {
    const response = await axios.post(API_URL, manufacturerData);
    return response.data;
  } catch (error) {
    console.error("Error creating manufacturer:", error);
    throw error;
  }
}
export const updateManufacturer = async (id, manufacturerData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, manufacturerData);
    return response.data;
  } catch (error) {
    console.error("Error updating manufacturer:", error);
    throw error;
  }
}
export const deleteManufacturer = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting manufacturer:", error);
    throw error;
  }
}