// services/videoService.js

import api from "../../../../utils/apiClient";

export const fetchVideosByRepresentative = async (representativeId) => {
  try {
    const response = await api.get(`/api/video/${representativeId}`);
    return response.data?.data?.videos || [];
  } catch (err) {
    // console.error("Failed to fetch videos:", err);
    return []; // Return empty array on failure
  }
};
