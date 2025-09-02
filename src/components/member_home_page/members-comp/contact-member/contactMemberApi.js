// api/representative.js
import api from "../../../../utils/apiClient";

export const getRepresentativeDetails = async (id) => {
  try {
    const res = await api.get(`/api/representatives/details/${id}`);
    return res.data?.data || null;
  } catch (err) {
    // console.error("Error fetching representative details:", err);
    return null;
  }
};
