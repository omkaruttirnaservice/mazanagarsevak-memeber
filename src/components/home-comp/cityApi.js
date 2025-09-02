// src/api/cityApi.js
import api from "../../utils/apiClient";

// Fetch city with ward numbers
export const fetchCityWards = async () => {
  try {
    const res = await api.get("/api/city-wards");
    return res.data.data; // returns array of cities with wardNo
  } catch (error) {
    // console.error("Error fetching city wards:", error);
    return [];
  }
};
