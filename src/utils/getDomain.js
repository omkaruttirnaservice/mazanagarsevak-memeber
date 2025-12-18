


// export const getDomain = (paramDomain) => {
//   if (paramDomain) {
//     // ⏺ If already full URL (starts with http/https), return as-is
//     if (paramDomain.startsWith("http://") || paramDomain.startsWith("https://")) {
//       return paramDomain;
//     }

//     // 🔁 Else construct it
//     return `https://${paramDomain}`;
//   }

//   // Fallback: get from window.location.hostname
//   const host = window.location.hostname;

//   if (host.includes("localhost")) return null;

//   const parts = host.split(".");
//   if (parts.length === 3) {
//     return `https://${host}`;
//   }

//   return null;
// };


// utils/getDomain.js
export const getDomain = (paramDomain) => {
  // ✅ If domain is provided from route (path-based)
  if (paramDomain) {
    // Already a full URL like "https://abc.mazanagarsevak.com"
    if (paramDomain.startsWith("http://") || paramDomain.startsWith("https://")) {
      return paramDomain;
    }

    // Otherwise, treat it as raw domain like "abc.mazanagarsevak.com"
    return `https://${paramDomain}`;
  }

  // 🌐 Production: extract from subdomain
  const host = window.location.hostname; // e.g. abc.mazanagarsevak.com

  // Skip if localhost
  if (host.includes("localhost")) 
    // console.warn("⚠️ Localhost detected, using test domain");
    // return "shailesh-dhage.mazanagarsevak.com";
    return null;

  // Check if it's a valid subdomain (like abc.mazanagarsevak.com)
  const parts = host.split(".");
  if (parts.length === 3) {
    return `https://${host}`; // Return full domain
  }

  return null; // Invalid or base domain
};
