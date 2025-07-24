import axios from 'axios';
const API_URL = '/api/v1/branches';
export const fetchBranches = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    throw error;
  }
}

export const createBranch = async (branchData) => {
  try {
    const response = await axios.post(API_URL, branchData);
    return response.data;
  } catch (error) {
    console.error('Error creating branch:', error);
    throw error;
  }
}
export const updateBranch = async (id, branchData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, branchData);
    return response.data;
  } catch (error) {
    console.error('Error updating branch:', error);
    throw error;
  }
}
export const deleteBranch = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting branch:', error);
    throw error;
  }
}