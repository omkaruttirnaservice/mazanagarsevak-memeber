import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkedAlt, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { fetchCityWards } from "./cityApi";
import { setCookie } from "../../utils/cookieUtils";
import { getRepresentativesByWard } from "../../pages/prabhagRepresentatives/representativeApi";
import HeroSection from "./HeroSection";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import images from "../../assets/hero_bg_image"; // make sure this has index.js exporting array

const CityPrabhagBar = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [prabhags, setPrabhags] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const containerRef = useRef(null);
  const sectionRef = useRef(null); // ✅ <-- This is the scroll target

  useEffect(() => {
    async function loadCities() {
      const data = await fetchCityWards();
      setCityList(data);
    }

    loadCities();
  }, []);

  const handleSelect = (cityName) => {
    const selected = cityList.find((c) => c.city === cityName);
    if (selected) {
      setSelectedCity(selected);
      setPrabhags(selected.wardNo);

      // ✅ Scroll to the section after state updates
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100); // Small delay to allow rendering
    } else {
      setSelectedCity(null);
      setPrabhags([]);
    }

    setShowDropdown(false);
  };

  const filteredCities = cityList.filter((c) =>
    c.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = async (wardNo) => {
    try {
      const reps = await getRepresentativesByWard(selectedCity?.city, wardNo);
      const rep = reps[0];

      if (rep && rep._id) {
        setCookie("representativeId", rep._id, {
          maxAge: 7 * 24 * 60 * 60,
        });
        // console.log("Cookie set:", rep._id);
      }

      navigate(
        `/prabhag/${encodeURIComponent(selectedCity.city)}/${encodeURIComponent(
          wardNo
        )}`
      );
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "अज्ञात त्रुटी आली आहे.";

      // console.error("API Error:", errorMsg);
      setError(errorMsg); // still useful if you want to log or use it elsewhere
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[65vh] sm:h-[70vh] mt-17">
        {/* Background Image Carousel */}
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="w-full h-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Radial Dark Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.1), rgba(0,0,0,0.25))",
          }}
        />

        {/* Centered Text Content */}
        <div
          className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-20 space-y-4"
          style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
        >
          <h1 className="text-white text-2xl sm:text-3xl lg:text-5xl font-extrabold drop-shadow-lg leading-snug">
            आता मिळवा आपल्या प्रभागातील सर्व विकास कामांची माहीती <br />
            फक्त एका क्लिक मध्ये.
          </h1>
          <p className="text-base sm:text-lg lg:text-xl font-medium max-w-3xl">
            तसेच आपल्या प्रभागातील समस्या आपल्या प्रभागातील उमेदवारांकडे
            मांडण्याची सुविधा.
          </p>

          {/* City Dropdown */}
          <div className="max-w-lg w-full mx-auto relative z-50">
            {/* ↑ z-50 ensures dropdown is above the cards */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6 tracking-wide">
              शहर निवडा
            </h2>

            <div className="relative" ref={containerRef}>
              <div
                onClick={() => setShowDropdown((prev) => !prev)}
                className="relative group bg-white px-5 py-3 rounded-xl shadow-lg cursor-pointer flex items-center justify-between text-lg text-gray-700 border-2 border-transparent hover:border-orange-400 transition-all duration-300"
              >
                {selectedCity ? (
                  <span className="flex items-center gap-3 text-gray-800 font-medium group-hover:text-orange-600 transition-all duration-300">
                    <FaMapMarkerAlt className="text-orange-500 animate-pulse group-hover:scale-110 transition-transform duration-300" />
                    {selectedCity.city}{" "}
                    <span className="text-sm text-gray-600 font-medium">
                      (प्रतिनिधी: {selectedCity.representativeCount})
                    </span>
                  </span>
                ) : (
                  <span className="flex items-center gap-3 text-gray-800 font-medium group-hover:text-orange-600 transition-all duration-300">
                    <FaMapMarkerAlt className="text-orange-500 animate-pulse group-hover:scale-110 transition-transform duration-300" />
                    शहर निवडा
                  </span>
                )}
                <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-orange-500 text-xl pointer-events-none group-hover:scale-110 transition-transform duration-300" />
              </div>

              {showDropdown && (
                <ul className="absolute z-50 w-full mt-2 bg-white border border-orange-200 rounded-xl shadow-xl max-h-64 overflow-y-auto animate-fade-in backdrop-blur-sm">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((cityObj) => (
                      <li
                        key={cityObj.city}
                        onClick={() => handleSelect(cityObj.city)}
                        className="bg-white border text-black border-orange-200 rounded-lg p-4 mb-2 shadow-sm hover:shadow-md transition cursor-pointer"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-orange-600" />
                            <span className="text-lg font-medium">
                              {cityObj.city}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-blue-600 bg-orange-100 px-2 py-0.5 rounded">
                            प्रतिनिधी: {cityObj.representativeCount}
                          </span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-6 py-4 text-gray-400 text-center">
                      शहर सापडले नाही
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>

          {selectedCity && selectedCity.city && prabhags.length > 0 && (
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center text-white mt-6 tracking-wider drop-shadow-md">
              <motion.span
                key={selectedCity.city}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                {selectedCity.city} - प्रभाग यादी
              </motion.span>
            </h2>
          )}
        </div>
      </section>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Prabhag List Section — show only if data exists */}
      {selectedCity && prabhags.length > 0 && (
        <section
          ref={sectionRef}
          className="relative w-full min-h-fit py-12 sm:py-16"
        >
          <div
            className="absolute inset-0 bg-center bg-cover z-0"
            style={{
              backgroundImage:
                "url('https://images.stockcake.com/public/c/a/9/ca9553c7-e2c3-43ba-abe2-af64e9a428b3_large/vibrant-political-rally-stockcake.jpg')",
            }}
          ></div>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {prabhags.map((prabhag, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCardClick(prabhag)}
                  className="relative bg-gradient-to-br from-white via-sky-50 to-sky-100 border-4 border-t-orange-500 border-b-green-500 rounded-xl p-6 sm:p-7 text-center shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden min-h-[120px]"
                >
                  <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Ashoka_Chakra.svg/1024px-Ashoka_Chakra.svg.png"
                      alt="Ashoka Chakra"
                      className="w-20 h-20 animate-spin"
                      style={{ animationDuration: "10s" }}
                    />
                  </div>

                  <div className="relative z-10">
                    <FaMapMarkedAlt className="text-blue-600 text-3xl mb-3 mx-auto" />
                    <p className="text-base sm:text-lg font-semibold text-blue-800">
                      {prabhag}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CityPrabhagBar;
