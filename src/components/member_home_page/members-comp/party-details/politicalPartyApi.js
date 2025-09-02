// services/politicalService.js

import api from "../../../../utils/apiClient";

export const fetchPoliticalPartyById = async (id) => {
  const response = await api.get(`api/political/${id}`);
  return response.data?.data;
};
