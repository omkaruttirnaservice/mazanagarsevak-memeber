import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fetchPoliticalPartyById } from "./politicalPartyApi";
import { getCookie } from "../../../../utils/cookieUtils";
import { BASE_URL } from "../../../../utils/apiClient";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHistory,
} from "react-icons/fa";
import { fetchRepresentativeById } from "../../../../pages/prabhagRepresentatives/representativeApi";

const PoliticalPartyDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showFullText, setShowFullText] = useState(false);
  const historyRef = React.useRef(null);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = React.useState(current);
  

  const id = getCookie("politicalPartyId");

  const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-center gap-3">
      <div className="text-orange-600 text-xl">{icon}</div>
      <span className="font-bold text-xl text-gray-700">{label}</span>
      <span className="text-gray-800 text-lg">{value}</span>
    </div>
  );

  // useEffect(() => {
  //   const load = async () => {
  //     const politicalPartyId = getCookie("politicalPartyId");
  //     try {
  //       const fetched = await fetchPoliticalPartyById(politicalPartyId);
  //       setData(fetched);
  //     } catch (err) {
  //       // console.error("Failed to fetch political party:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   load();
  // }, []);

useEffect(() => {
  const load = async () => {
    const representativeId = getCookie("representativeId");
    if (!representativeId) return;

    try {
      const repData = await fetchRepresentativeById(representativeId);
      if (repData?.politicalParty) {
        setData(repData.politicalParty);
      }
    } catch (err) {
      console.error("Failed to fetch representative or political party:", err);
    } finally {
      setLoading(false);
    }
  };

  load();
}, []);


  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showFullText]);

  useEffect(() => {
    if (!data.banarImage || data.banarImage.length === 0) return; // early exit, but hook is called

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.banarImage.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [data.banarImage]);

  React.useEffect(() => {
    if (current !== prev) {
      setPrev(current);
    }
  }, [current]);

if (loading) {
  return <p className="text-center text-gray-500">लोड करत आहे...</p>;
}

if (!data?.name) {
  return (
    <div className="text-center bg-gradient-to-b from-orange-100 via-white to-green-100 text-black text-xl font-semibold py-10 mt-40">
      पक्षाची माहिती उपलब्ध नाही
    </div>
  );
}

  const isLong = data?.history?.length > 400;
  const shortText = showFullText
    ? data?.history
    : `${data?.history?.slice(0, 400)}...`;

  return (
    <>
      <div className="relative z-10 px-2 lg:px-2 pt-3 mt-30 bg-gradient-to-b from-orange-100 via-white to-green-100">
        {/* Top Header with Flag Waves and Logo */}
        <div
          className="relative bg-gradient-to-b from-orange-500 to-orange-600 text-center pb-6 rounded-b-3xl shadow-xl overflow-hidden w-full  max-h-[20vh]"
          style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden  ">
            {/* Subtle diagonal stripes */}
            <div className="absolute inset-0bg-[linear-gradient(45deg,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1)_87.5%,transparent_87.5%)] bg-[length:40px_40px] opacity-20"></div>

            {/* Sparkles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animation: `twinkle ${
                    Math.random() * 3 + 2
                  }s infinite alternate`,
                }}
              />
            ))}
          </div>

          {/* Dynamic waves */}

          {/* Wrapper for logo + title + flags */}
          <div className="relative z-10 flex items-center justify-center gap-8 mt-4 px-6">
            {/* Flipping Logo with glow effect */}
            <motion.div
              className="w-28 h-28 relative rounded-full bg-white border-4 border-orange-600 shadow-lg"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{ perspective: 600 }}
            >
              {/* Front side */}
              <div
                className="absolute inset-0 rounded-full border-2 border-white/30 flex items-center justify-center bg-white"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <img
                  src={`${BASE_URL}/uploads/party/symbols/${data.symbol}`}
                  alt="Party Symbol"
                  className="w-24 h-24 object-contain rounded-full"
                />
              </div>

              {/* Back side */}
              <div
                className="absolute inset-0 rounded-full border-2 border-white/30 flex items-center justify-center bg-white"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <img
                  src={`${BASE_URL}/uploads/party/symbols/${data.symbol}`}
                  alt="Party Symbol"
                  className="w-24 h-24 object-contain rounded-full"
                  style={{ transform: "rotateY(180deg)" }}
                />
              </div>
            </motion.div>

            {/* Title + Flags container */}
            <div className="relative text-white text-left">
              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]">
                {data.name}
              </h1>

              {/* Decorative flags */}
            </div>
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-24 bg-orange-400 clip-flag-left transform rotate-[-15deg] shadow-md"></div>
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-16 h-24 bg-orange-400 clip-flag-right transform rotate-[15deg] shadow-md"></div>
          </div>

          {/* Subtle bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-700"></div>
        </div>

        {/* Main Content */}
        <section
          className="w-full max-w-8xl mx-auto flex flex-col gap-8 py-8  px-0 lg:px-2"
          style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
        >
          {/* Leader Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center bg-white lg:p-6 p-2 rounded-2xl shadow-xl border border-orange-200">
            {/* Leader Image */}
            <div className="w-full md:w-1/3  ">
              <img
                src={`${BASE_URL}/uploads/party/leader-photos/${data.mainLeadPhoto}`}
                alt={data.leader}
                loading="lazy"
                className="w-full max-w-full h-auto object-cover rounded-2xl shadow-2xl border-4 border-orange-400 hover:scale-105 transition-transform"
              />
            </div>

            {/* Leader Info */}
            <div className="w-full md:w-2/3 flex flex-col relative">
              <h2 className="text-3xl md:text-4xl font-extrabold text-orange-700 mb-8 drop-shadow-md">
                {data.leader}
              </h2>

              {/* Logo image positioned top-right */}

              <img
                src={`${BASE_URL}/uploads/party/symbols/${data.symbol}`}
                alt="Party Symbol"
                className="hidden sm:block w-32 h-32 object-contain rounded-full border-4 border-orange-300 shadow-md absolute top-0 right-10 mr-4"
              />

              {/* Social Icons */}
              <div className="flex gap-6 text-3xl mb-8">
                {[
                  {
                    href: data.facebook,
                    icon: <FaFacebook />,
                    color:
                      "text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200",
                    key: "facebook",
                  },
                  {
                    href: data.twitter,
                    icon: <FaTwitter />,
                    color:
                      "text-sky-500 hover:text-sky-700 bg-sky-100 hover:bg-sky-200",
                    key: "twitter",
                  },
                  {
                    href: data.instagram,
                    icon: <FaInstagram />,
                    color:
                      "text-pink-500 hover:text-pink-700 bg-pink-100 hover:bg-pink-200",
                    key: "instagram",
                  },
                  {
                    href: data.youtube,
                    icon: <FaYoutube />,
                    color:
                      "text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200",
                    key: "youtube",
                  },
                ].map(({ href, icon, color, key }) =>
                  href ? (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${color} shadow-md hover:scale-110`}
                      aria-label={key}
                    >
                      {icon}
                    </a>
                  ) : null
                )}
              </div>

              {/* Dynamic Info Cards */}
              <div className="grid grid-cols-2  md:grid-cols-2 gap-6">
                {[
                  { title: "अध्यक्ष", content: data.leader },
                  { title: "स्थापना वर्ष", content: data.foundationYear },
                  { title: "मुख्य कार्यालय", content: data.headOffice },
                  {
                    title: "संकेतस्थळ",
                    content: (
                      <div className="max-w-[200px] overflow-hidden whitespace-nowrap">
                        <a
                          href={data.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 font-semibold hover:underline truncate"
                        >
                          {data.website}
                        </a>
                      </div>
                    ),
                  },
                ].map(({ title, content }) => (
                  <div
                    key={title}
                    className="bg-white p-6 rounded-xl shadow-lg border border-orange-300 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-200
    animate-gradient-x hover:shadow-2xl transition-shadow duration-300"
                  >
                    <h3 className="font-bold text-xl text-orange-600 mb-3">
                      {title}
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      {content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-1 w-full my-6 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 shadow-lg animate-pulse" />

          {/* Regional Focus */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden border border-orange-300 shadow-lg bg-orange-50">
            {data.banarImage && data.banarImage.length > 0 ? (
              <>
                <motion.div
                  key={`prev-${prev}`}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 0.95 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 bg-center bg-cover rounded-lg pointer-events-none"
                  style={{
                    backgroundImage: `url(${BASE_URL}/uploads/party/banner/${data.banarImage[prev]})`,
                  }}
                />

                <motion.div
                  key={`current-${current}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 bg-center bg-cover rounded-lg"
                  style={{
                    backgroundImage: `url(${BASE_URL}/uploads/party/banner/${data.banarImage[current]})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 rounded-lg" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-6">
                    <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] leading-tight">
                      जनतेसोबत, विकासाच्या मार्गावर
                    </h2>
                    <p className="mt-4 text-lg md:text-2xl font-medium max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                      निष्ठा, सेवा आणि एकतेसह नवा महाराष्ट्र घडवूया.
                    </p>
                  </div>
                </motion.div>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center h-full p-6 text-center text-orange-400 italic bg-orange-100 rounded-lg">
                <p className="text-lg font-semibold">No images available</p>
                <p className="mt-1 text-sm">
                  Please check back later for updates.
                </p>
              </div>
            )}

            {/* Pagination dots */}
            {data.banarImage && data.banarImage.length > 0 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                {data.banarImage.map((_, i) => (
                  <button
                    key={i}
                    className={`w-4 h-4 rounded-full transition-colors duration-300 shadow-md ${
                      i === current
                        ? "bg-orange-600 shadow-lg scale-110"
                        : "bg-orange-300 hover:bg-orange-400"
                    }`}
                    onClick={() => setCurrent(i)}
                    aria-label={`Slide ${i + 1}`}
                    style={{ outline: "none" }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Agitations and Welfare Programmes */}

          {/* इतिहास Section */}
          <div className="relative w-full p-6 md:p-10 rounded-2xl border-2 border-yellow-600 shadow-xl bg-[url('/old-paper-texture.jpg')] bg-cover bg-no-repeat bg-center overflow-hidden group transition-all duration-500 hover:scale-[1.01]">
            {/* Soft overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f8ecd6]/90 via-[#fffef7]/85 to-[#f7deb0]/90 z-0 rounded-2xl backdrop-blur-sm" />

            {/* Optional decorative stamp or icon */}
            <div className="absolute top-4 right-4 text-yellow-600 text-opacity-50 text-5xl rotate-[-10deg] select-none pointer-events-none z-0 font-serif">
              🕰️
            </div>

            <div className="relative z-10 text-gray-900">
              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-extrabold text-yellow-800 mb-4 flex items-center gap-3 drop-shadow-md">
                <FaHistory className="text-2xl text-yellow-700" />
                इतिहास:
              </h3>

              {/* Body */}
              <p className="whitespace-pre-line text-md leading-relaxed tracking-wide font-medium  md:text-lg text-gray-800">
                {shortText}
              </p>

              {/* Toggle Button */}
              {data?.history?.length > 400 && (
                <div className="mt-4">
                  <button
                    onClick={() => {
                      if (showFullText && historyRef.current) {
                        historyRef.current.scrollIntoView({
                          behavior: "smooth",
                        });
                      }
                      setShowFullText((prev) => !prev);
                    }}
                    className="text-yellow-800 hover:text-yellow-600 font-semibold underline decoration-yellow-500 hover:decoration-yellow-700 transition duration-300"
                  >
                    {showFullText ? "कमी वाचा" : "अधिक वाचा"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* पार्टी फोटो गॅलरी Section */}
          <div className="w-full mt-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-orange-600 mb-6 flex items-center gap-3">
              📸 फोटो गॅलरी
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.partyImages?.map((img, index) => (
                <div
                  key={index}
                  className="relative group rounded-xl overflow-hidden shadow-lg border-2 border-yellow-800 bg-orange-50 hover:shadow-2xl transition duration-300"
                >
                  {/* Image */}
                  <img
                    src={`${BASE_URL}/uploads/party/images/${img}`}
                    alt={`Party image ${index + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-white text-lg font-semibold">
                    {/* पार्टी छायाचित्र {index + 1} */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* कार्य Section */}
          <div className="w-full p-8 rounded-2xl border-2 border-orange-600 shadow-xl bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden group transition-all duration-300 hover:scale-[1.01]">
            {/* Decorative background element (optional, subtle stamp or icon) */}
            <div className="absolute top-4 right-4 text-orange-200 text-5xl rotate-[15deg] select-none pointer-events-none z-0">
              🛠️
            </div>

            {/* Section Title */}
            <h3 className="text-3xl font-extrabold text-orange-700 mb-6 flex items-center gap-3 z-10 relative">
              <span className="text-4xl">📋</span> कार्य:
            </h3>

            {/* Work List */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-800 z-10 relative">
              {data.work?.map((item, idx) => (
                <li
                  key={idx}
                  className="text-lg font-medium relative pl-8 before:content-['✔'] before:absolute before:left-0 before:top-0.5 before:text-green-600 before:text-xl"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default PoliticalPartyDetails;
