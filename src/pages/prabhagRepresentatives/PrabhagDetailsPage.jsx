// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { FaUserCircle } from "react-icons/fa";
// import { getRepresentativesByWard } from "./representativeApi";
// import { BASE_URL } from "../../utils/apiClient";
// import { HiOutlineExclamationCircle } from "react-icons/hi";

// const PrabhagDetailsPage = () => {
//   const { city, wardNo } = useParams();
//   const [members, setMembers] = useState([]);
//   const navigate = useNavigate();
//   const [error, setError] = useState(""); // Add this line

//   useEffect(() => {
//     if (!city || !wardNo) return; // guard clause

//     const fetchData = async () => {
//       try {
//         setError("");
//         const data = await getRepresentativesByWard(
//           decodeURIComponent(city),
//           decodeURIComponent(wardNo)
//         );
//         setMembers(data);
//       } catch (err) {
//         // console.error(err);
//         setMembers([]);
//         setError(err?.message || "अज्ञात त्रुटी");
//       }
//     };

//     fetchData();
//   }, [city, wardNo]);

//   const handleClick = () => {
//     navigate(`/member/home`);
//   };

//   return (
//     <>
//       <Helmet>
//         <title>{`${decodeURIComponent(wardNo)} चे सदस्य`}</title>
//         <meta
//           name="description"
//           content={`${decodeURIComponent(wardNo)} मधील नगरसेवकांची यादी`}
//         />
//       </Helmet>

//       <div className="min-h-screen bg-fixed bg-center bg-cover relative flex flex-col items-center justify-start px-4 py-10 bg-gradient-to-b from-orange-200 via-white to-green-200">
//         <div className="w-full max-w-8xl max-h-[120vh] px-4 sm:px-8 py-10 mt-20 relative z-10">
//           {/* Heading */}
//           <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-orange-800 mb-10 text-center border-b-4 border-orange-600 pb-3 inline-block mx-auto px-4 py-3 rounded-md">
//             {decodeURIComponent(wardNo)} चे सदस्य
//           </h1>

//           {error && (
//             <div className="relative bg-gradient-to-r from-red-100 via-red-200 to-red-100 text-red-800 border-l-4 border-red-500 p-4 rounded-md mb-6 py-8 shadow-lg">
//               <div className="flex items-center space-x-3">
//                 <HiOutlineExclamationCircle className="text-red-600 w-8 h-8 animate-pulse" />
//                 <span className="text-sm sm:text-base font-medium">
//                   {error}
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* Member Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-fade-in">
//             {members.map((member) => (
//               <div
//                 key={member._id}
//                 onClick={() => handleClick(member.name)}
//                 className="cursor-pointer bg-white/60 border-4 border-orange-500 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 hover:bg-white/80 transition duration-300 p-6 flex flex-col items-center backdrop-blur-sm"
//               >
//                 {/* Image Container */}
//                 <div className="w-28 h-28 mb-4 rounded-full overflow-hidden shadow-md border-4 border-white ring-4 ring-gradient-to-br from-orange-400 to-green-400 transition-transform duration-500 hover:scale-110">
//                   {member.representativephoto ? (
//                     <img
//                       src={`${BASE_URL}/uploads/representative/${member.representativephoto}`}
//                       alt={member.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <FaUserCircle className="w-full h-full text-orange-300" />
//                   )}
//                 </div>

//                 {/* Name */}
//                 <h2 className="text-lg font-semibold text-green-900 tracking-wide text-center">
//                   {member.name}
//                 </h2>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PrabhagDetailsPage;
