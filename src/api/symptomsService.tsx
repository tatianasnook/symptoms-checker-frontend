import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const checkSymptoms = async (symptoms: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/check-symptoms`, { symptoms });
    return response.data.conditions;
  } catch (error) {
    console.error("Error fetching conditions:", error);
    throw error;
  }
};

export const getConditionInfo = async (condition: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/get-condition-info`, { condition });
    return response.data.details;
  } catch (error) {
    console.error("Error fetching condition details:", error);
    throw error;
  }
};

export const fetchHistory = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getRecords`);
    return response.data;
  } catch (error) {
    console.error("Error fetching search history:", error);
    throw error;
  }
};

export const saveSearchHistory = async (symptoms: string, conditions: string) => {
  try {
    const date = new Date().toISOString().split("T")[0];
    await axios.post(`${BASE_URL}/saveRecord`, { symptoms, conditions, date });
  } catch (error) {
    console.error("Error saving search history:", error);
    throw error;
  }
};

export const deleteRecord = async (id: string) => {
  try {
    await axios.delete(`${BASE_URL}/deleteRecord/${id}`);
  } catch (error) {
    console.error("Error deleting record:", error);
    throw error;
  }
};
