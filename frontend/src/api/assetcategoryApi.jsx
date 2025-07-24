import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/asset-categories"; // Adjust the base URL as needed
const subcategoryApi = "http://localhost:5000/api/v1/asset-subcategories"; // Adjust the base URL as needed
export const fetchAssetCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching asset subcategories:", error);
    throw error;
  }
}
export const createAssetCategory = async (subcategoryData) => {
  try {
    const response = await axios.post(API_URL, subcategoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating asset subcategory:", error);
    throw error;
  }
}
export const updateAssetCategory = async (id, subcategoryData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, subcategoryData);
    return response.data;
  } catch (error) {
    console.error("Error updating asset subcategory:", error);
    throw error;
  }
}
export const deleteAssetCategory = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting asset subcategory:", error);
        throw error;
    }
    }
export const fetchSubcategories = async () => {
  try {
    const response = await axios.get(subcategoryApi);
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
}
export const createSubcategory = async (subcategoryData) => {
  try {
    const response = await axios.post(subcategoryApi, subcategoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating subcategory:", error);
    throw error;
  }
}
 
export const updateSubcategory = async (id, subcategoryData) => {
  try {
    const response = await axios.put(`${subcategoryApi}/${id}`, subcategoryData);
    return response.data;
  } catch (error) {
    console.error("Error updating subcategory:", error);
    throw error;
  }
}
export const deleteSubcategory = async (id) => {
  try {
    const response = await axios.delete(`${subcategoryApi}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    throw error;
  }
}
