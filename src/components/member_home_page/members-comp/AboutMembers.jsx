import React from "react";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { BASE_URL } from "../../../utils/apiClient";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"; // import icons

const AboutMembers = ({
  photo,
  description = "",
  name,
  facebook,
  twitter,
  instagram,
  youtube,
}) => {
  return (
    <div className="relative z-10 mt-30 lg:mt-35 ">
      <section className="w-full max-w-8xl px-0 lg:px-6 py-7 mt-2 relative z-10">
        <div className="max-w-8xl mx-auto">
          {/* Heading */}
          <div className="mb-8 px-4 lg:px-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-orange-600 drop-shadow-sm mb-2">
              स्वप्न विकासाचे, स्वप्न विकसित प्रभागाचे
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-medium italic border-l-4 border-orange-300 pl-3">
              माझ्या विषयी माहिती
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative bg-white/80 backdrop-blur-md border border-orange-200 shadow-2xl rounded-xl p-4 lg:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start"
          >
            {/* Mobile: Image + Name + Social */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col items-center md:hidden mx-auto"
            >
              <img
                src={`${BASE_URL}/uploads/representative/${photo}`}
                alt={name}
                className="rounded-full border-4 border-orange-400 w-40 h-40 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <p className="mt-3 text-lg font-semibold text-orange-700 text-center">
                {name}
              </p>
              {/* Social icons */}
              <div className="mt-3 flex gap-4 justify-center">
                <a
                  href={facebook || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white rounded-full p-2 transition-all duration-300"
                >
                  <FaFacebook className="text-xl" />
                </a>
                <a
                  href={instagram || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white rounded-full p-2 transition-all duration-300"
                >
                  <FaInstagram className="text-xl" />
                </a>
                <a
                  href={twitter || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-sky-400 text-sky-500 hover:bg-sky-400 hover:text-white rounded-full p-2 transition-all duration-300"
                >
                  <FaTwitter className="text-xl" />
                </a>
                <a
                  href={youtube || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full p-2 transition-all duration-300"
                >
                  <FaYoutube className="text-xl" />
                </a>
              </div>
            </motion.div>

            {/* Text Section */}
            <div
              className="md:w-2/3 text-base sm:text-lg text-gray-800 leading-relaxed text-justify space-y-4"
              style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                <FaUser className="text-orange-500" /> माझी ओळख (About Me)
              </h2>
              {description.split("\n\n").map((para, index) => (
                <p key={index} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>

            {/* Desktop: Image + Socials on Right */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="hidden md:flex flex-col items-center absolute top-20 right-20"
            >
              <img
                src={`${BASE_URL}/uploads/representative/${photo}`}
                alt={name}
                className="rounded-full border-4 border-orange-400 w-52 h-52 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <p className="mt-3 text-lg font-semibold text-orange-700">
                {name}
              </p>
              {/* Social icons */}
              <div className="mt-3 flex gap-4">
                <a
                  href={facebook || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white rounded-full p-2 transition-all duration-300"
                >
                  <FaFacebook className="text-2xl" />
                </a>
                <a
                  href={instagram || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white rounded-full p-2 transition-all duration-300"
                >
                  <FaInstagram className="text-2xl" />
                </a>
                <a
                  href={twitter || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-sky-400 text-sky-500 hover:bg-sky-400 hover:text-white rounded-full p-2 transition-all duration-300"
                >
                  <FaTwitter className="text-2xl" />
                </a>
                <a
                  href={youtube || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full p-2 transition-all duration-300"
                >
                  <FaYoutube className="text-2xl" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutMembers;
