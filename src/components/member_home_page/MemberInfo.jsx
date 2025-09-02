import React from "react";
import { BASE_URL } from "../../utils/apiClient";
import { FaPhoneAlt } from "react-icons/fa";

const MemberInfo = ({ biography, representativePhoto, name, contactNo }) => {
  if (!biography) return null;

  const formattedBiography = biography
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line, index) => (
      <p
        key={index}
        className="text-gray-700 leading-relaxed mb-3 text-sm sm:text-base"
      >
        {line}
      </p>
    ));

  return (
    <div className="relative z-10 flex flex-col items-center justify-start">
      <section
        className="w-full max-w-8xl px-6 sm:px-10 py-8 sm:py-12 mt-8 
      bg-gradient-to-br from-purple-50 via-pink-50 to-white 
      rounded-2xl shadow-2xl border border-orange-300"
        style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
      >
        {/* Title */}
        <h2
          className="text-3xl sm:text-4xl font-extrabold text-orange-600 mb-10 
        border-b-4 border-orange-500 pb-3 text-center tracking-wide"
        >
          व्यक्तिगत माहिती
        </h2>

        {/* Content Wrapper */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10">
          {/* Image Section */}
          <div className="flex-shrink-0 text-center">
            <div className="relative group">
              <img
                src={`${BASE_URL}/uploads/representative/${representativePhoto}`}
                alt="Representative"
                className="w-40 h-40 sm:w-52 sm:h-52 rounded-full object-cover 
              shadow-lg border-4 border-white 
              transition-transform duration-300 transform group-hover:scale-105 group-hover:shadow-orange-200"
              />
              <div className="absolute inset-0 rounded-full bg-orange-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <h3 className="mt-4 text-lg sm:text-xl font-bold text-orange-700">
              {name}
            </h3>
            {/* <h2>{contactNo}</h2> */}
            <a
              href={`tel:${contactNo}`}
              className="inline-flex items-center gap-3 px-5 py-3 bg-orange-100 text-orange-800 
  font-semibold text-lg rounded-xl shadow hover:bg-orange-200 hover:text-orange-900 
  transition-all duration-300 ring-1 ring-orange-300"
            >
              <FaPhoneAlt className="text-orange-600" />
              {contactNo}
            </a>
          </div>

          {/* Biography Section */}
          <div className="flex-1 p-2 lg:p-5">
            <div className="space-y-4 text-gray-800 leading-relaxed text-sm sm:text-base">
              {formattedBiography}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MemberInfo;
