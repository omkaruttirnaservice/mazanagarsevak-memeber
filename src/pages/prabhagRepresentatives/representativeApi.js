import axios from "axios";
import api from "../../utils/apiClient";

export const getRepresentativesByWard = async (city, wardNo) => {
  try {
    const response = await api.get("/api/representatives/by-ward", {
      params: { city, wardNo },
    });
    return response.data?.data || [];
  } catch (error) {
    // ✅ Throw the message to handle in component
    throw new Error(
      error.response?.data?.message || "Failed to fetch representatives"
    );
  }
};

// representativeApi.js
// export const fetchRepresentativeById = async (id) => {
//   try {
//     const response = await api.get(`/api/representatives/${id}`);
//     return response.data.data;
//   } catch (error) {
//     // console.error("Error fetching representative:", error);
//     return null;
//   }
// };


// export const fetchRepresentativeById = async (id, domain) => {
//   try {
//     const response = await api.get("/api/representatives", {
//       params: { id, domain },  // दोन्ही query मधून ✅
//     });

//     return response.data?.data || null;
//   } catch (error) {
//     console.error(
//       "Error fetching representative:",
//       error?.response?.data || error.message
//     );
//     return null;
//   }
// };
export const fetchRepresentativeById = async (id, domain) => {
  try {
    // ✅ Always make sure domain exists
    if (!domain) {
      domain = localStorage.getItem("domain");
    }

    const response = await api.get("/api/representatives", {
      params: { id, domain },
    });

    console.log("this is the console from api directly:", response);
    return response.data?.data || null;
  } catch (error) {
    console.error(
      "Error fetching representative:",
      error?.response?.data || error.message
    );
    return null;
  }
};



// services/userService.js
export const createUser = async (email, pincode) => {
  try {
    const response = await api.post(`/api/user`, {
      email,
      pincode,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Please Try Again !" };
  }
};

