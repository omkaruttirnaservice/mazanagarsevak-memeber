// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaArrowRight } from "react-icons/fa";
// import images from "../../assets/vaibhav_thakare_bg";

// const MemberIntroSlider = ({ cityData }) => {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       className="w-full relative mt-25"
//       style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
//     >
//       {/* Background Image Section */}
//       <div className="relative z-10 w-full h-[500px] md:h-[400px] overflow-hidden">
//         <img
//           src={images[current]}
//           alt="Slide"
//           className="w-full h-full object-cover brightness-[0.5]"
//         />
//       </div>

//       {/* Card Coming Outside the Image */}
//       <motion.div
//         initial={{ opacity: 0, y: 80 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4, type: "spring", stiffness: 60 }}
//         className="relative z-20 -mt-40 w-full flex justify-center px-4"
//       >
//         <div className="relative z-50 bg-white backdrop-blur-md shadow-2xl border-4 border-orange-500 rounded-3xl w-full max-w-5xl p-6 md:p-10 text-gray-900 overflow-hidden">
//           {/* Glow */}
//           <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-orange-300 via-white/10 to-transparent blur-xl opacity-30 pointer-events-none"></div>

//           {/* Heading */}
//           <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-4 tracking-tight">
//             माननीय {cityData?.name || "सदस्य"}
//           </h2>

//           {/* Biography */}
//           <p className="text-gray-700 text-md md:text-base font-semibold leading-relaxed mb-6 max-w-5xl whitespace-pre-line">
//             {cityData?.biography
//               ? cityData.biography.length > 400
//                 ? cityData.biography.slice(0, 400) + "..."
//                 : cityData.biography
//               : "माहिती लोड केली जात आहे..."}
//           </p>

//           {/* Link */}
//           <Link
//             to="/member/home/about-member"
//             className="z-50 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 hover:scale-105 transition-all text-sm font-semibold"
//           >
//             पुढे वाचा <FaArrowRight />
//           </Link>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default MemberIntroSlider;

// import dependencies
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const MemberIntroSlider = ({ cityData }) => {
  const works = cityData?.works || [];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (works.length > 0) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % works.length);
      }, 5000); // Slide changes every 5 seconds
      return () => clearInterval(interval);
    }
  }, [works]);

  const getImageUrl = (imageName) =>
    `${import.meta.env.VITE_API_BASE_URL}/uploads/representative/work/${imageName}`;

  const fallbackImage = "/fallback-image.jpg";
  const currentImage =
    works.length > 0 ? getImageUrl(works[current].image) : fallbackImage;

  return (
    <div
      className="w-full relative mt-25"
      style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
    >
      {/* Background Image Section */}
      <div className="relative z-10 w-full h-[500px] md:h-[400px] overflow-hidden">
        <img
          src={currentImage}
          alt={`Work ${current + 1}`}
          className="w-full h-full object-cover brightness-[0.5] transition-all duration-1000"
        />
      </div>

      {/* Card Coming Outside the Image */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 60 }}
        className="relative z-20 -mt-40 w-full flex justify-center px-4"
      >
        <div className="relative z-50 bg-white backdrop-blur-md shadow-2xl border-4 border-orange-500 rounded-3xl w-full max-w-5xl p-6 md:p-10 text-gray-900 overflow-hidden">
          {/* Glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-orange-300 via-white/10 to-transparent blur-xl opacity-30 pointer-events-none"></div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-4 tracking-tight">
            माननीय {cityData?.name || "सदस्य"}
          </h2>

          {/* Biography */}
          <p className="text-gray-700 text-md md:text-base font-semibold leading-relaxed mb-6 max-w-5xl whitespace-pre-line">
            {cityData?.biography
              ? cityData.biography.length > 400
                ? cityData.biography.slice(0, 400) + "..."
                : cityData.biography
              : "माहिती लोड केली जात आहे..."}
          </p>

          {/* Link */}
          <Link
            to="/about-member"
            className="z-50 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 hover:scale-105 transition-all text-sm font-semibold"
          >
            पुढे वाचा <FaArrowRight />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default MemberIntroSlider;
