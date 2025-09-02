// components/GallerySection.jsx
import { useEffect, useState } from "react";
import { getCookie } from "../../../../utils/cookieUtils";
import { fetchPhotosByRepresentative } from "./photoApi";
import { BASE_URL } from "../../../../utils/apiClient";
import { motion, AnimatePresence } from "framer-motion";

const GallerySection = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const loadPhotos = async () => {
      const representativeId = getCookie("representativeId");

      if (!representativeId) {
        // console.warn("No representativeId cookie found");
        return;
      }

      const fetchedPhotos = await fetchPhotosByRepresentative(representativeId);
      setPhotos(fetchedPhotos);
    };

    loadPhotos();
  }, []);

  return (
    <section className="py-20 b bg-gradient-to-b from-orange-200 via-white to-green-200 mt-20">
      <div
        className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
      >
        <h2 className="text-4xl font-bold text-center text-orange-700 mb-12 drop-shadow-sm">
          सामाजिक कार्याचे फोटो संग्रह
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {photos.map((item, index) => (
            <div
              key={item._id || index}
              // onClick={() => setSelectedPhoto(item)}
              onClick={() => setSelectedPhoto(index)}
              className="relative group cursor-pointer rounded-xl overflow-hidden shadow-xl border-4 border-transparent bg-white transition-transform duration-300 transform hover:scale-105 hover:border-orange-400 hover:shadow-2xl"
            >
              {/* Image */}
              <img
                src={`${BASE_URL}/uploads/representative/photos/${item.photo}`}
                alt={item.title}
                className="w-full h-72 object-cover object-center transition-all duration-300 group-hover:scale-110"
              />

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 backdrop-blur-sm">
                <h4 className="text-lg font-semibold text-white truncate drop-shadow">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-200 line-clamp-2 drop-shadow">
                  {item.description}
                </p>
              </div>

              {/* Accent border glow */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-orange-300 group-hover:shadow-[0_0_20px_rgba(255,165,0,0.4)] transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}

          <AnimatePresence>
            {selectedPhoto !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-80 p-4"
              >
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-lg shadow-2xl max-w-4xl w-full h-[85vh] overflow-hidden border-4 flex flex-col"
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="absolute top-3 right-3 bg-gray-500 hover:bg-gray-600 font-semibold text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition duration-200 z-10"
                  >
                    ✕
                  </button>

                  {/* Image section */}
                  <div className="w-full h-72 lg:h-95 overflow-auto hide-scrollbar bg-black flex items-center justify-center">
                    {/* Prev button */}
                    <button
                      onClick={() =>
                        setSelectedPhoto(
                          (selectedPhoto - 1 + photos.length) % photos.length
                        )
                      }
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-6xl z-10 hover:text-orange-400"
                    >
                      ‹
                    </button>

                    <img
                      src={`${BASE_URL}/uploads/representative/photos/${photos[selectedPhoto]?.photo}`}
                      alt={photos[selectedPhoto]?.title}
                      className="object-contain"
                    />

                    {/* Next button */}
                    <button
                      onClick={() =>
                        setSelectedPhoto((selectedPhoto + 1) % photos.length)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-6xl z-10 hover:text-orange-400"
                    >
                      ›
                    </button>
                  </div>

                  {/* Description */}
                  <div className="p-6 overflow-y-auto flex-1 hide-scrollbar">
                    <h3 className="text-2xl font-bold text-orange-700 mb-2">
                      {photos[selectedPhoto]?.title}
                    </h3>
                    <p className="text-black text-lg whitespace-pre-line leading-relaxed">
                      {photos[selectedPhoto]?.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {photos.length === 0 && (
            <p className="text-center text-gray-600 col-span-full text-lg">
              No photos available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
