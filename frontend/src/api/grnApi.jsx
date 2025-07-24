// import React from "react";
import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/grns"; // Adjust the base URL as needed
export const fetchGrns = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching GRNs:", error);
    throw error;
  }
};
export const createGrn = async (grnData) => {
  try {
    const response = await axios.post(API_URL, grnData);
    return response.data;
  } catch (error) {
    console.error("Error creating GRN:", error);
    throw error;
  }
};
export const updateGrn = async (id, grnData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, grnData);
    return response.data;
  } catch (error) {
    console.error("Error updating GRN:", error);
    throw error;
  }
};
export const deleteGrn = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting GRN:", error);
    throw error;
  }
};
