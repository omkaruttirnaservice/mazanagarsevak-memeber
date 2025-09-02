import React from "react";
import { Calendar } from "lucide-react";
import { BASE_URL } from "../../../utils/apiClient";
import { motion } from "framer-motion";

const PoliticalJourney = ({ careerHistory, workImages = [] }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-orange-200 shadow-2xl rounded-xl w-full max-w-7xl mt-6 p-5 sm:p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start mx-auto">
      {/* LEFT: Text Content */}
      <div
        className="w-full md:w-2/3 text-base sm:text-lg text-gray-800 leading-relaxed order-1 md:order-1"
        style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
      >
        <p className="font-semibold text-orange-700 text-xl sm:text-2xl mb-4 text-center md:text-left">
          स्वप्न विकासाचे, स्वप्न विकसित प्रभागाचे
        </p>

        <p className="mb-4 flex gap-2 justify-center md:justify-start">
          <span>
            <Calendar />
          </span>
          राजकीय व सामाजिक कार्यातील काही महत्वाचे साल व मला मिळालेली पदे खालील
          प्रमाणे:
        </p>

        <ul className="list-disc list-inside space-y-2 px-2 sm:px-4">
          {careerHistory?.map((item, idx) => (
            <li key={idx}>
              <strong>{item.year}</strong> - {item.position},{" "}
              {item.organization}, {item.location}
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT: Work Images */}
      <div className="w-full md:w-1/3 flex flex-col gap-4 items-center order-2 md:order-2">
        {workImages.slice(0, 2).map((img, idx) => (
          <img
            key={idx}
            src={`${BASE_URL}/uploads/representative/work/${img}`}
            alt={`कार्यक्रम फोटो ${idx + 1}`}
            className="rounded-xl shadow-md border-4 border-orange-300 w-full max-h-48 object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default PoliticalJourney;
