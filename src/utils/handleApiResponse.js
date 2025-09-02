// export function handleApiResponse(response) {
//   if (!response.success || response.statusCode >= 400) {
//     const error = new Error(response.message || "Something went wrong");
//     error.statusCode = response.statusCode;
//     error.response = response;
//     throw error;
//   }
//   return response.message;
// }


// utils/handleApiResponse.js
// export function handleApiResponse(response) {
//   if (!response.success || response.statusCode >= 400) {
//     const error = new Error(response.message || "Something went wrong");
//     error.statusCode = response.statusCode;
//     error.message = response.message || "Something went wrong";
//     throw error;
//   }
//   return response.data; // return full data (or .message if preferred)
// }


export function handleApiResponse(response) {
  if (!response.success || response.statusCode >= 400) {
    const error = new Error(response?.data?.message || response.message || "Please Try Again !");
    error.statusCode = response.statusCode;
    error.response = response?.data;
    throw error;
  }

  return response.data;
}

