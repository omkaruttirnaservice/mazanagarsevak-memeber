// src/pages/AppRedirect.jsx
import { useEffect } from "react";
import { getDomain } from "../utils/getDomain";
// import { getDomain } from "../utils/getDomain";

const AppRedirect = () => {
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const fullDomainUrl = getDomain(); // e.g. https://dratmaramkumbharde.apalaneta.in

    console.log("VITE_API_BASE_URL:", baseUrl);
    console.log("Full domain from getDomain():", fullDomainUrl);

    if (!baseUrl || !fullDomainUrl) {
      console.error("❌ Missing baseUrl or domain");
      return;
    }

    // Extract only domain name
    // const domain = fullDomainUrl.replace(/^https?:\/\//, "");
    // console.log("Extracted domain:", domain);

     const domain = fullDomainUrl
      .replace(/^https?:\/\//, "") // remove http/https
      .split(".")[0]; // take first subdomain

    console.log("Extracted domain:", domain);


    const redirectUrl = `${baseUrl}/uploads/app/${domain}.apk`;

    console.log("✅ Redirecting to APK URL: ", redirectUrl);

    // window.location.href = redirectUrl;
    window.location.replace(redirectUrl);

  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem", fontFamily: "Arial" }}>
      <h3>📲 Redirecting to app download...</h3>
      <p>Please wait...</p>
    </div>
  );
};

export default AppRedirect;


// src/pages/AppRedirect.jsx (for teasting locally)
// import { useEffect } from "react";
// import { getDomain } from "../utils/getDomain";

// const AppRedirect = () => {
//   useEffect(() => {
//     const baseUrl = import.meta.env.VITE_API_BASE_URL;
//     const fullDomainUrl = getDomain();

//     console.log("🧪 TEST MODE");
//     console.log("Base URL:", baseUrl);
//     console.log("Full Domain:", fullDomainUrl);

//     if (!fullDomainUrl) {
//       console.error("❌ Domain not detected");
//       return;
//     }

//     const domain = fullDomainUrl.replace(/^https?:\/\//, "");
//     const redirectUrl = `${baseUrl}/uploads/app/${domain}.apk`;

//     console.log("✅ FINAL APK URL:", redirectUrl);

//     // ❌ COMMENTED FOR TESTING
//     // window.location.href = redirectUrl;
//   }, []);

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>🧪 AppRedirect Test Page</h2>
//       <p>Open DevTools → Console</p>
//     </div>
//   );
// };

// export default AppRedirect;
