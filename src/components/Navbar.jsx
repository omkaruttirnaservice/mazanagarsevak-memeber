// import { useParams, Link, useLocation } from "react-router-dom";
// import {
//   TbHome2,
//   TbChecklist,
//   TbFlag3,
//   TbUserShield,
//   TbHeartHandshake,
//   TbVideo,
//   TbPhoto,
//   TbPhoneCall,
// } from "react-icons/tb"; // All icons from Tabler

// const Navbar = () => {
//   const { memberName } = useParams();
//   const location = useLocation();

//   const links = [
//     { label: "मुख्यपृष्ठ", path: `/member/home`, icon: <TbHome2 /> },
//     {
//       label: "नागरीक सुविधा",
//       path: `/member/home/nagrik-suvidha`,
//       icon: <TbChecklist />,
//     },
//     {
//       label: "पक्षाची माहिती",
//       path: `/member/home/about-party`,
//       icon: <TbFlag3 />,
//     },
//     {
//       label: "राजकीय प्रवास",
//       path: `/member/home/about-member`,
//       icon: <TbUserShield />,
//     },
//     {
//       label: "सामाजिक कार्य",
//       path: `/member/home/social-work`,
//       icon: <TbHeartHandshake />,
//     },
//     {
//       label: "विडिओ",
//       path: `/member/home/videos`,
//       icon: <TbVideo />,
//     },
//     {
//       label: "फोटो",
//       path: `/member/home/images`,
//       icon: <TbPhoto />,
//     },
//     {
//       label: "संपर्क साधा",
//       path: `/member/home/contact-member`,
//       icon: <TbPhoneCall />,
//     },
//   ];

// return (
//   <div className="bg-black/30 backdrop-blur-md py-3 px-2 shadow-md w-full overflow-x-auto scrollbar-hide">
//     <nav className="flex gap-3 sm:gap-4 text-sm sm:text-base font-medium text-white min-w-max justify-center sm:justify-center">
//       {links.map(({ label, path, icon }, idx) => (
//         <Link key={idx} to={path} className="shrink-0">
//           <button
//             className={`flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 shadow-sm border whitespace-nowrap
//               ${
//                 location.pathname === path
//                   ? "bg-orange-600 text-white border-orange-600"
//                   : "bg-white text-black font-semibold hover:bg-gray-100 border-gray-300"
//               }`}
//           >
//             <span className="text-lg sm:text-xl">{icon}</span>
//             <span className="truncate">{label}</span>
//           </button>
//         </Link>
//       ))}
//     </nav>
//   </div>
// );

// };

// export default Navbar;



// import { useLocation } from "react-router-dom";
// import {
//   TbHome2,
//   TbChecklist,
//   TbFlag3,
//   TbUserShield,
//   TbHeartHandshake,
//   TbVideo,
//   TbPhoto,
//   TbPhoneCall,
// } from "react-icons/tb";

// const Navbar = () => {
//   const location = useLocation();

//   // Get current hostname → extract subdomain
//   const host = window.location.hostname; // e.g. abc.mazhanagarsevak.com
//   const subdomain = host.split(".")[0];  // "abc"

//   const links = [
//     { label: "मुख्यपृष्ठ", path: `/`, icon: <TbHome2 /> },
//     { label: "नागरीक सुविधा", path: `/nagrik-suvidha`, icon: <TbChecklist /> },
//     { label: "पक्षाची माहिती", path: `/about-party`, icon: <TbFlag3 /> },
//     { label: "राजकीय प्रवास", path: `/about-member`, icon: <TbUserShield /> },
//     { label: "सामाजिक कार्य", path: `/social-work`, icon: <TbHeartHandshake /> },
//     { label: "विडिओ", path: `/videos`, icon: <TbVideo /> },
//     { label: "फोटो", path: `/images`, icon: <TbPhoto /> },
//     { label: "संपर्क साधा", path: `/contact-member`, icon: <TbPhoneCall /> },
//   ];

//   return (
//     <div className="bg-black/30 backdrop-blur-md py-3 px-2 shadow-md w-full overflow-x-auto scrollbar-hide">
//       <nav className="flex gap-3 sm:gap-4 text-sm sm:text-base font-medium text-white min-w-max justify-center sm:justify-center">
//         {links.map(({ label, path, icon }, idx) => {
//           const fullPath = `https://${subdomain}.mazhanagarsevak.com${path}`;
//           const isActive = location.pathname === path;

//           return (
//             <a key={idx} href={fullPath} className="shrink-0">
//               <button
//                 className={`flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 shadow-sm border whitespace-nowrap
//                   ${
//                     isActive
//                       ? "bg-orange-600 text-white border-orange-600"
//                       : "bg-white text-black font-semibold hover:bg-gray-100 border-gray-300"
//                   }`}
//               >
//                 <span className="text-lg sm:text-xl">{icon}</span>
//                 <span className="truncate">{label}</span>
//               </button>
//             </a>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default Navbar;



// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import {
//   TbHome2,
//   TbChecklist,
//   TbFlag3,
//   TbUserShield,
//   TbHeartHandshake,
//   TbVideo,
//   TbPhoto,
//   TbPhoneCall,
// } from "react-icons/tb";

// const Navbar = () => {
//   const location = useLocation();
//   const [subdomain, setSubdomain] = useState("");

//   // ✅ safely read window on client only
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const host = window.location.hostname; // e.g. abc.mazhanagarsevak.com
//       const parts = host.split(".");
//       setSubdomain(parts[0] || "");
//     }
//   }, []);

//   const links = [
//     { label: "मुख्यपृष्ठ", path: `/home`, icon: <TbHome2 /> },
//     { label: "नागरीक सुविधा", path: `/nagrik-suvidha`, icon: <TbChecklist /> },
//     { label: "पक्षाची माहिती", path: `/about-party`, icon: <TbFlag3 /> },
//     { label: "राजकीय प्रवास", path: `/about-member`, icon: <TbUserShield /> },
//     { label: "सामाजिक कार्य", path: `/social-work`, icon: <TbHeartHandshake /> },
//     { label: "विडिओ", path: `/videos`, icon: <TbVideo /> },
//     { label: "फोटो", path: `/images`, icon: <TbPhoto /> },
//     { label: "संपर्क साधा", path: `/contact-member`, icon: <TbPhoneCall /> },
//   ];

//   return (
//     <div className="bg-black/30 backdrop-blur-md py-3 px-2 shadow-md w-full overflow-x-auto scrollbar-hide">
//       <nav className="flex gap-3 sm:gap-4 text-sm sm:text-base font-medium text-white min-w-max justify-center sm:justify-center">
//         {links.map(({ label, path, icon }, idx) => {
//           // ✅ until we know subdomain, fallback to relative paths
//           const fullPath = subdomain
//             ? `https://${subdomain}.mazhanagarsevak.com${path}`
//             : path;

//           const isActive = location.pathname === path;

//           return (
//             <a key={idx} href={fullPath} className="shrink-0">
//               <button
//                 className={`flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 shadow-sm border whitespace-nowrap
//                   ${
//                     isActive
//                       ? "bg-orange-600 text-white border-orange-600"
//                       : "bg-white text-black font-semibold hover:bg-gray-100 border-gray-300"
//                   }`}
//               >
//                 <span className="text-lg sm:text-xl">{icon}</span>
//                 <span className="truncate">{label}</span>
//               </button>
//             </a>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default Navbar;


// import { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import {
//   TbHome2,
//   TbChecklist,
//   TbFlag3,
//   TbUserShield,
//   TbHeartHandshake,
//   TbVideo,
//   TbPhoto,
//   TbPhoneCall,
// } from "react-icons/tb";
// import { useSelector } from "react-redux";
// // import { useLocation, Link } from "react-router-dom";
// // import { useEffect } from "react";

// // const Navbar = () => {
// //   const location = useLocation();
// //   const [subdomain, setSubdomain] = useState("");

// //   useEffect(() => {
// //     if (typeof window !== "undefined") {
// //       const host = window.location.hostname; // e.g. abc.mazhanagarsevak.com OR localhost
// //       const parts = host.split(".");
// //       // ✅ Only set subdomain if NOT localhost
// //       if (host !== "localhost") {
// //         setSubdomain(parts[0] || "");
// //       }
// //     }
// //   }, []);

// //   const links = [
// //     { label: "मुख्यपृष्ठ", path: `/home`, icon: <TbHome2 /> },
// //     { label: "नागरीक सुविधा", path: `/nagrik-suvidha`, icon: <TbChecklist /> },
// //     { label: "पक्षाची माहिती", path: `/about-party`, icon: <TbFlag3 /> },
// //     { label: "राजकीय प्रवास", path: `/about-member`, icon: <TbUserShield /> },
// //     { label: "सामाजिक कार्य", path: `/social-work`, icon: <TbHeartHandshake /> },
// //     { label: "विडिओ", path: `/videos`, icon: <TbVideo /> },
// //     { label: "फोटो", path: `/images`, icon: <TbPhoto /> },
// //     { label: "संपर्क साधा", path: `/contact-member`, icon: <TbPhoneCall /> },
// //   ];

// //   return (
// //     <div className="bg-black/30 backdrop-blur-md py-3 px-2 shadow-md w-full overflow-x-auto scrollbar-hide">
// //       <nav className="flex gap-3 sm:gap-4 text-sm sm:text-base font-medium text-white min-w-max justify-center sm:justify-center">
// //         {links.map(({ label, path, icon }, idx) => {
// //           // ✅ Localhost → use SPA route
// //           // ✅ Production → build full subdomain path
// //           const fullPath = subdomain
// //             ? `https://${subdomain}.mazhanagarsevak.com${path}`
// //             : path;

// //           const isActive = location.pathname === path;

// //           // return (
// //           //   <Link key={idx} to={path} className="shrink-0">
// //           //     <button
// //           //       className={`flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 shadow-sm border whitespace-nowrap
// //           //         ${
// //           //           isActive
// //           //             ? "bg-orange-600 text-white border-orange-600"
// //           //             : "bg-white text-black font-semibold hover:bg-gray-100 border-gray-300"
// //           //         }`}
// //           //     >
// //           //       <span className="text-lg sm:text-xl">{icon}</span>
// //           //       <span className="truncate">{label}</span>
// //           //     </button>
// //           //   </Link>
// //           // );
      
// //       return subdomain ? (
// //   // 🌐 Production (subdomain): use <a href>
// //   <a key={idx} href={`https://${subdomain}.mazhanagarsevak.com${path}`} className="shrink-0">
// //     <button
// //       className={`flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 shadow-sm border whitespace-nowrap
// //         ${
// //           isActive
// //             ? "bg-orange-600 text-white border-orange-600"
// //             : "bg-white text-black font-semibold hover:bg-gray-100 border-gray-300"
// //         }`}
// //     >
// //       <span className="text-lg sm:text-xl">{icon}</span>
// //       <span className="truncate">{label}</span>
// //     </button>
// //   </a>
// // ) : (
// //   // 🧪 Localhost: use <Link to>
// //   <Link key={idx} to={path} className="shrink-0">
// //     <button
// //       className={`flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 shadow-sm border whitespace-nowrap
// //         ${
// //           isActive
// //             ? "bg-orange-600 text-white border-orange-600"
// //             : "bg-white text-black font-semibold hover:bg-gray-100 border-gray-300"
// //         }`}
// //     >
// //       <span className="text-lg sm:text-xl">{icon}</span>
// //       <span className="truncate">{label}</span>
// //     </button>
// //   </Link>
// // );

// //       })}
// //       </nav>
// //     </div>
// //   );
// // };


// const Navbar = () => {
//   const location = useLocation();
//   const subdomain = useSelector((state) => state.subdomain.value); // ✅ from Redux

//   const links = [
//     { label: "मुख्यपृष्ठ", path: `/home`, icon: <TbHome2 /> },
//     { label: "नागरीक सुविधा", path: `/nagrik-suvidha`, icon: <TbChecklist /> },
//     { label: "पक्षाची माहिती", path: `/about-party`, icon: <TbFlag3 /> },
//     { label: "राजकीय प्रवास", path: `/about-member`, icon: <TbUserShield /> },
//     { label: "सामाजिक कार्य", path: `/social-work`, icon: <TbHeartHandshake /> },
//     { label: "विडिओ", path: `/videos`, icon: <TbVideo /> },
//     { label: "फोटो", path: `/images`, icon: <TbPhoto /> },
//     { label: "संपर्क साधा", path: `/contact-member`, icon: <TbPhoneCall /> },
//   ];

//   return (
//     <div className="bg-black/30 backdrop-blur-md py-3 px-2 shadow-md w-full overflow-x-auto scrollbar-hide">
//       <nav className="flex gap-3 sm:gap-4 text-sm sm:text-base font-medium text-white min-w-max justify-center sm:justify-center">
//         {links.map(({ label, path, icon }, idx) => {
//           const fullPath = subdomain
//             ? `https://${subdomain}.mazhanagarsevak.com${path}`
//             : path;

//           const isActive = location.pathname === path;

//           return subdomain ? (
//             <a key={idx} href={fullPath} className="shrink-0">
//               <button
//                 className={`flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 shadow-sm border whitespace-nowrap
//                   ${
//                     isActive
//                       ? "bg-orange-600 text-white border-orange-600"
//                       : "bg-white text-black font-semibold hover:bg-gray-100 border-gray-300"
//                   }`}
//               >
//                 <span className="text-lg sm:text-xl">{icon}</span>
//                 <span className="truncate">{label}</span>
//               </button>
//             </a>
//           ) : (
//             <Link key={idx} to={path} className="shrink-0">
//               <button
//                 className={`flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 shadow-sm border whitespace-nowrap
//                   ${
//                     isActive
//                       ? "bg-orange-600 text-white border-orange-600"
//                       : "bg-white text-black font-semibold hover:bg-gray-100 border-gray-300"
//                   }`}
//               >
//                 <span className="text-lg sm:text-xl">{icon}</span>
//                 <span className="truncate">{label}</span>
//               </button>
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default Navbar;


import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  TbHome2,
  TbChecklist,
  TbFlag3,
  TbUserShield,
  TbHeartHandshake,
  TbVideo,
  TbPhoto,
  TbPhoneCall,
} from "react-icons/tb";

const Navbar = () => {
  const location = useLocation();
  const subdomain = useSelector((state) => state.subdomain.value);

  // ✅ Log subdomain on every route change
  useEffect(() => {
    console.log("🌐 Current Subdomain:", subdomain);
  }, [location.pathname, subdomain]);

  const links = [
    { label: "मुख्यपृष्ठ", path: `/`, icon: <TbHome2 /> },
    { label: "नागरीक सुविधा", path: `/nagrik-suvidha`, icon: <TbChecklist /> },
    { label: "पक्षाची माहिती", path: `/about-party`, icon: <TbFlag3 /> },
    { label: "राजकीय प्रवास", path: `/about-member`, icon: <TbUserShield /> },
    { label: "सामाजिक कार्य", path: `/social-work`, icon: <TbHeartHandshake /> },
    { label: "विडिओ", path: `/videos`, icon: <TbVideo /> },
    { label: "फोटो", path: `/images`, icon: <TbPhoto /> },
    { label: "संपर्क साधा", path: `/contact-member`, icon: <TbPhoneCall /> },
  ];

  return (
    <div className="bg-black/30 backdrop-blur-md py-3 px-2 shadow-md w-full overflow-x-auto scrollbar-hide">
      <nav className="flex gap-3 sm:gap-4 text-sm sm:text-base font-medium text-white min-w-max justify-center sm:justify-center">
        {links.map(({ label, path, icon }, idx) => {
          const fullPath = subdomain
            ? `https://${subdomain}.mazhanagarsevak.com${path}`
            : path;

          const isActive = location.pathname === path;

          return subdomain ? (
            <a key={idx} href={fullPath} className="shrink-0">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 shadow-sm border whitespace-nowrap
                  ${
                    isActive
                      ? "bg-orange-600 text-white border-orange-600"
                      : "bg-white text-black font-semibold hover:bg-gray-100 border-gray-300"
                  }`}
              >
                <span className="text-lg sm:text-xl">{icon}</span>
                <span className="truncate">{label}</span>
              </button>
            </a>
          ) : (
            <Link key={idx} to={path} className="shrink-0">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 shadow-sm border whitespace-nowrap
                  ${
                    isActive
                      ? "bg-orange-600 text-white border-orange-600"
                      : "bg-white text-black font-semibold hover:bg-gray-100 border-gray-300"
                  }`}
              >
                <span className="text-lg sm:text-xl">{icon}</span>
                <span className="truncate">{label}</span>
              </button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
