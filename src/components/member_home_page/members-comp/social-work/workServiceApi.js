// services/workService.js
import api from "../../../../utils/apiClient";

export const fetchSocialWorksByRepresentative = async (representativeId) => {
  try {
    const response = await api.get(
      `/api/work/${representativeId}`
    );
    return response.data?.data?.works || [];
  } catch (error) {
    // console.error("Failed to fetch social works:", error);
    return [];
  }
};
