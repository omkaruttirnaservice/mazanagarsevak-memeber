import api from "../../../../utils/apiClient";

export const fetchServicesByRepresentative = async (id) => {
  try {
    const res = await api.get(`/api/services/representative/${id}`);
    return res.data?.data; // Assuming "data" contains the relevant info
  } catch (error) {
    // console.error("Error fetching representative data:", error);
    throw error;
  }
};

export const fetchSubServicesByServiceId = async (serviceId) => {
  try {
    const response = await api.get(`/api/sub-services/${serviceId}`);
    return response.data.data || [];
  } catch (error) {
    // console.error("Failed to fetch sub-services:", error);
    return [];
  }
};
