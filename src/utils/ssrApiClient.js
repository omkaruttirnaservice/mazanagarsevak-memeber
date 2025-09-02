// ssrApi.js
import axios from "axios";

const ssrApi = axios.create({
  baseURL: process.env.API_BASE_URL, // Note: no import.meta here
});

export default ssrApi;
