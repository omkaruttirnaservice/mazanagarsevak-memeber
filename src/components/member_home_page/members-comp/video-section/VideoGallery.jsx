// components/VideoGallery.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchVideosByRepresentative } from "./videoApi";
import { getCookie } from "../../../../utils/cookieUtils";

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      const representativeId = getCookie("representativeId");

      if (!representativeId) {
        // console.warn("No representativeId found in cookies");
        setLoading(false);
        return;
      }

      const videos = await fetchVideosByRepresentative(representativeId);
      setVideos(videos);
      setLoading(false);
    };

    loadVideos();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-orange-200 via-white to-green-200 mt-20">
      <div
        className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
      >
        <h2 className="text-4xl font-bold text-center text-orange-700 mb-12 drop-shadow-sm">
          आमच्या व्हिडिओ क्लिप्स
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 mt-8 text-lg">
            लोडिंग व्हिडिओ...
          </p>
        ) : videos.length === 0 ? (
          <p className="text-center text-red-600 mt-8 text-lg">
            कोणतेही व्हिडिओ सापडले नाहीत.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {videos.map((video, index) => (
              <motion.div
                key={video._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group rounded-xl overflow-hidden shadow-xl border-4 border-transparent bg-white transition-transform duration-300 transform hover:scale-105 hover:border-orange-400 hover:shadow-2xl"
              >
                {/* Video Embed */}
                <div className="aspect-video overflow-hidden">
                  <iframe
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                    src={video.videoUrl}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-4 backdrop-blur-sm">
                  <h4 className="text-lg font-semibold text-white truncate drop-shadow">
                    {video.title}
                  </h4>
                  <p className="text-sm text-gray-200 drop-shadow">
                    {video.date}
                  </p>
                </div>

                {/* Accent border glow */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-orange-300 group-hover:shadow-[0_0_20px_rgba(30,144,255,0.4)] transition-all duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoGallery;
