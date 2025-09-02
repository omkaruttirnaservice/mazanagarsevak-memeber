import { Routes, Route, useLocation } from "react-router-dom";
import MemberLayout from "./components/layouts/MemberLayout";
import MemberMainPage from "./pages/member-section/MemberMainPage";
import AboutMemberPage from "./pages/member-section/AboutMemberPage";
import SocialWorkPage from "./pages/member-section/SocialWorkPage";
import MemberVideoPage from "./pages/member-section/MemberVideoPage";
import MemberGalleryPage from "./pages/member-section/MemberGalleryPage";
import MemberContactPage from "./pages/member-section/MemberContactPage";
import NagrikSuvidhaPage from "./pages/member-section/NagrikSuvidhaPage";
import PoliticalPartyPage from "./pages/member-section/PartyDetailsPage";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import useSubdomain from "./hooks/useSubdomain";
import { useDispatch } from "react-redux";
import { setSubdomain } from "./store/slices/subdomainSlice";

// for hardcoded working code
// function App() {
//   // 🔹 Global hardcoded domain
//   const subdomain = "abc.mazhanagarsevak.com"; // later you can make it dynamic

//   // useEffect(() => {
//   //   // ✅ Set domain in localStorage whenever subdomain changes
//   //   if (subdomain) {
//   //     localStorage.setItem("domain", subdomain);
//   //       // 🔄 Force reload when subdomain changes

//   //   }
//   // }, [subdomain]);

//   useEffect(() => {
//   const stored = localStorage.getItem("domain");

//   if (subdomain && stored !== subdomain) {
//     localStorage.setItem("domain", subdomain);

//     // add reload only once
//     if (!sessionStorage.getItem("reloaded")) {
//       sessionStorage.setItem("reloaded", "true");
//       window.location.reload();
//     }
//   }
// }, [subdomain]);

//   useEffect(() => {
//     console.log("Full URL:", window.location.href);
//     console.log("Subdomain:", window.location.hostname.split(".")[0]);
//     console.log("Stored Domain:", localStorage.getItem("domain"));
//   }, [subdomain]); // ✅ log whenever subdomain changes

//   // ✅ Example API call using latest domain from localStorage
//   useEffect(() => {
//     const domain = localStorage.getItem("domain");
//   // 🔄 Force reload when subdomain changes
//     // window.location.reload();
//     if (domain) {
//       axios
//         .get(`${import.meta.env.VITE_API_BASE_URL}/api/representatives`, {
//           params: { domain },
//         })
//         .then((res) => {
//           console.log("Rep Data:", res.data);
//         })
//         .catch((err) => {
//           console.error("API Error:", err);
//         });
//     }
//   }, [subdomain]); // call again if subdomain changes

// return (
//   <>
//     <Routes>
//       <Route path="/" element={<MemberLayout />}>
//         <Route index element={<MemberMainPage />} />
//         <Route path="about-member" element={<AboutMemberPage />} />
//         <Route path="social-work" element={<SocialWorkPage />} />
//         <Route path="videos" element={<MemberVideoPage />} />
//         <Route path="images" element={<MemberGalleryPage />} />
//         <Route path="about-party" element={<PoliticalPartyPage />} />
//         <Route path="contact-member" element={<MemberContactPage />} />
//         <Route path="nagrik-suvidha" element={<NagrikSuvidhaPage />} />
//         <Route path="*" element={<MemberMainPage />} />
//       </Route>
//     </Routes>

//     {/* ✅ Correct place for ToastContainer */}
//     <ToastContainer position="top-right" autoClose={3000} />
//   </>
// );

// }

function App() {
  const [domain, setDomain] = useState("");
  const [domainNotFound, setDomainNotFound] = useState(false);

  // useEffect(() => {
  //   if (typeof window !== "undefined") { // ✅ check for browser
  //     let current = window.location.host;
  //     // let current = "abc.mazhanagarsevak.com";
  //     console.log(current);
  //     if (current.startsWith("localhost")) current = "localhost:5174";

  //     setDomain(current);
  //     localStorage.setItem("domain", current); // safe now
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let current = window.location.host;

      if (!current) {
        setDomainNotFound(true);
        return;
      }

      if (current.startsWith("localhost")) {
        current = "localhost:5174";
      }

      setDomain(current);
      localStorage.setItem("domain", current);
    } else {
      setDomainNotFound(true);
    }
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  // useEffect(() => {
  //   if (!domain) return;

  //   axios
  //     .get(`${import.meta.env.VITE_API_BASE_URL}/api/representatives`, {
  //       params: { domain },
  //     })
  //     .then(res => console.log(res.data))
  //     .catch(err => console.error(err));
  // }, [domain]);

  useEffect(() => {
    if (
      import.meta.env.MODE !== "development" || // ⛔ not in dev
      !domain // ⛔ domain not available
    )
      return;

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/representatives`, {
        params: { domain },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, [domain]);

  if (domainNotFound) {
    return (
      <div
        style={{ textAlign: "center", padding: "2rem", fontFamily: "Arial" }}
      >
        <h2>⚠️ डोमेन ओळखण्यात अयशस्वी.</h2>
        <p>डेटा मिळवण्यासाठी कृपया पृष्ठ पुन्हा लोड करा.</p>
        <button
          onClick={handleReload}
          style={{
            marginTop: "1rem",
            padding: "0.6rem 1.2rem",
            fontSize: "1rem",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          🔄 पुन्हा लोड करा
        </button>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<MemberLayout />}>
          <Route index element={<MemberMainPage />} />
          <Route path="about-member" element={<AboutMemberPage />} />
          <Route path="social-work" element={<SocialWorkPage />} />
          <Route path="videos" element={<MemberVideoPage />} />
          <Route path="images" element={<MemberGalleryPage />} />
          <Route path="about-party" element={<PoliticalPartyPage />} />
          <Route path="contact-member" element={<MemberContactPage />} />
          <Route path="nagrik-suvidha" element={<NagrikSuvidhaPage />} />
          <Route path="*" element={<MemberMainPage />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
