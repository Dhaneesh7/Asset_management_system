import axios from "axios";
// import { update } from "../../../backend/controllers/assetCategoryControllers";
// const API_URL = "/api/v1/vendors"; // Adjust the base URL as needed
const API_URL = "http://localhost:5000/api/v1/vendors"; // Adjust the base URL as needed
export const fetchVendors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    throw error;
  }
}
export const createVendor = async (vendorData) => {
  try {
    const response = await axios.post(API_URL, vendorData);
    return response.data;
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw error;
  }
}
// export default updateVendor = async (id, vendorData) => {
//   try {
//     const response = await axios.put(`${API_URL}/${id}`, vendorData);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating vendor:", error);
//     throw error;
//   }
// }
export const deleteVendor = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting vendor:", error);
        throw error;
    }
    }
  export  const updateVendor = async (id, vendorData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, vendorData);
    return response.data;
  } catch (error) {
    console.error("Error updating vendor:", error);
    throw error;
  } 
}