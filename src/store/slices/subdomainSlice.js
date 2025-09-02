// // src/store/slices/subdomainSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const getInitialSubdomain = () => {
//   const host = window.location.hostname;
//   if (host === "localhost") return null;

//   const parts = host.split(".");
//   return parts.length > 2 ? parts[0] : null;
// };

// const subdomainSlice = createSlice({
//   name: "subdomain",
//   initialState: {
//     value: getInitialSubdomain(), // ✅ initialize from browser
//   },
//   reducers: {
//     setSubdomain: (state, action) => {
//       state.value = action.payload;
//     },
//   },
// });

// export const { setSubdomain } = subdomainSlice.actions;
// export default subdomainSlice.reducer;


// src/store/slices/subdomainSlice.js
// src/store/slices/subdomainSlice.js
// src/store/slices/subdomainSlice.js
import { createSlice } from "@reduxjs/toolkit";

const subdomainSlice = createSlice({
  name: "subdomain",
  initialState: {
    value: "", // Default empty, will be filled client-side
  },
  reducers: {
    setSubdomain: (state, action) => {
      console.log("✅ Subdomain set to:", action.payload); // <-- Debug log
      state.value = action.payload;
    },
  },
});

export const { setSubdomain } = subdomainSlice.actions;
export default subdomainSlice.reducer;
