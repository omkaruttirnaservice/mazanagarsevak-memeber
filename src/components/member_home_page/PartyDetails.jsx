import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaCrown,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaHistory,
} from "react-icons/fa";
import { BASE_URL } from "../../utils/apiClient";

const PartyDetails = ({ politicalParty }) => {
  const navigate = useNavigate();
  const maxChars = 300; // Approx. 3–4 lines
  const history = politicalParty?.history || "";

  const isLong = history.length > maxChars;
  const shortText = isLong ? history.slice(0, maxChars) + "..." : history;

  if (!politicalParty) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative max-w-8xl mx-auto p-4 sm:p-6 md:p-10 bg-gradient-to-br from-purple-100 via-pink-50 to-white
      rounded-2xl shadow-xl border border-orange-300 hover:shadow-2xl transition-shadow duration-300"
      style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
    >
      {/* Glow Background */}
      <div className="absolute inset-0 z-[-1] rounded-2xl bg-gradient-to-r from-orange-300 to-yellow-300 blur-sm opacity-30" />

      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600 mb-6 border-b-4 border-orange-500 pb-2 text-center">
        पक्ष माहिती
      </h2>

      {/* Symbol + Name Section */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-center gap-6 mb-6 text-center sm:text-left">
        {/* Symbol & Name */}
        <div className="flex flex-row lg:flex-col items-center gap-4">
          <img
            src={`${BASE_URL}/uploads/party/symbols/${politicalParty.symbol}`}
            alt="Party Symbol"
            className="w-16 h-16 sm:w-24 sm:h-24 object-contain rounded-full border-4 border-orange-300 shadow-md"
          />
          <div>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900">
              {politicalParty.name}
              <span className="text-orange-600 text-base sm:text-xl ml-2 font-semibold">
                ({politicalParty.abbreviation})
              </span>
            </h3>
            <div className="w-12 sm:w-16 h-1 bg-orange-500 mt-1 sm:mt-2 mx-auto sm:mx-0 rounded" />
          </div>
        </div>

        {/* Leader */}
        <div className="flex flex-col items-center gap-2 sm:items-end">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-orange-300 shadow-md">
            <img
              src={`${BASE_URL}/uploads/party/leader-photos/${politicalParty.mainLeadPhoto}`}
              alt="मुख्य नेता"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-orange-100 border-2 border-orange-300 text-orange-800 font-bold text-sm sm:text-base md:text-lg text-center px-4 py-2 rounded-lg shadow-sm">
            {politicalParty.leader}
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
        <div className="flex items-start gap-3 p-4 bg-orange-50 border-2 border-orange-500 rounded-lg shadow-sm">
          <FaCrown className="text-xl sm:text-2xl text-orange-600 mt-1" />
          <div>
            <p className="font-semibold text-orange-700">अध्यक्ष:</p>
            <p className="text-sm sm:text-base">{politicalParty.leader}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-orange-50 border-2 border-orange-500 rounded-lg shadow-sm">
          <FaCalendarAlt className="text-xl sm:text-2xl text-orange-600 mt-1" />
          <div>
            <p className="font-semibold text-orange-700">स्थापना वर्ष:</p>
            <p className="text-sm sm:text-base">
              {politicalParty.foundationYear}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-orange-50 border-2 border-orange-500 rounded-lg shadow-sm">
          <FaMapMarkerAlt className="text-xl sm:text-2xl text-orange-600 mt-1" />
          <div>
            <p className="font-semibold text-orange-700">मुख्य कार्यालय:</p>
            <p className="text-sm sm:text-base">{politicalParty.headOffice}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-orange-50 border-2 border-orange-500 rounded-lg shadow-sm">
          <FaGlobe className="text-xl sm:text-2xl text-orange-600 mt-1" />
          <div>
            <p className="font-semibold text-orange-700">साइट:</p>
            <a
              href={politicalParty.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-900 break-words text-sm sm:text-base"
            >
              {politicalParty.website}
            </a>
          </div>
        </div>
      </div>

      {/* इतिहास */}
      <div className="flex items-start gap-3 sm:gap-4 mt-6 p-4 bg-orange-50 border-2 border-orange-500 rounded-xl shadow-md">
        <FaHistory className="text-2xl sm:text-3xl text-orange-700 mt-1" />
        <div className="text-sm sm:text-base">
          <p className="font-semibold text-orange-800 mb-1">इतिहास:</p>
          <p className="text-gray-800 whitespace-pre-line">{shortText}</p>
          {isLong && (
            <button
              onClick={() => navigate("/about-party")}
              className="mt-2 text-orange-700 font-semibold hover:underline"
            >
              अधिक वाचा
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PartyDetails;
