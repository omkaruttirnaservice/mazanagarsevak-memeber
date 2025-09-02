import api from "../../../../utils/apiClient";

export const fetchPhotosByRepresentative = async (representativeId) => {
  try {
    const response = await api.get(`/api/photo/${representativeId}`);
    return response.data?.data?.photos || [];
  } catch (err) {
    // console.error("Failed to fetch photos:", err);
    return [];
  }
};
