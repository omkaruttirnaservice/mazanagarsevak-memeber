import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';

// ✅ Load .env file (for both client and server)
dotenv.config({ path: './.env' });

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
          allowedHosts: true
  },
  ssr: {
    // 👇 SSR-safe libraries
    noExternal: ['react-router-dom', 'react-helmet-async'],
  },
});


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import dotenv from "dotenv";

// // ✅ Load environment variables from .env
// dotenv.config();

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     host: true,             // 👈 allows external access (useful for subdomains, mobile testing)
//     port: 5174,             // 👈 define your dev port explicitly
//     strictPort: true,       // 👈 fail if port is taken, instead of switching
//     allowedHosts: ["*"],    // 👈 allow all hosts (or specify your domain)
//     hmr: {
//       clientPort: 5174,     // 👈 ensures HMR works behind proxies/subdomains
//     },
//   },
//   preview: {
//     port: 4173, // 👈 separate port for `vite preview`
//   },
//   ssr: {
//     noExternal: ["react-router-dom", "react-helmet-async"],
//   },
// });
