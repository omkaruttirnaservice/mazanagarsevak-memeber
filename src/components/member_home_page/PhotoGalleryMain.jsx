import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BASE_URL } from "../../utils/apiClient";

const PhotoGalleryMain = ({ cityData }) => {
  const scrollRef = useRef();

  // Convert cityData.photos to gallery format
  const photos = cityData?.photos || [];

  // Repeat items for infinite scroll illusion
  const repeatedItems = [...photos, ...photos, ...photos];

  const scroll = (direction) => {
    if (direction === "left") scrollRef.current.scrollLeft -= 300;
    else scrollRef.current.scrollLeft += 300;
  };

  useEffect(() => {
    const container = scrollRef.current;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScrollLeft = scrollWidth - clientWidth;

      if (scrollLeft <= 0) {
        container.scrollLeft = scrollWidth / 3;
      } else if (scrollLeft >= maxScrollLeft - 1) {
        container.scrollLeft = scrollWidth / 3;
      }
    };

    container.addEventListener("scroll", handleScroll);

    setTimeout(() => {
      container.scrollLeft = scrollRef.current.scrollWidth / 3;
    }, 100);

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center justify-start mt-2">
      <section className="bg-gradient-to-br from-purple-100 via-pink-50 to-white rounded-xl shadow-2xl w-full max-w-8xl px-4 sm:px-6 py-5 mt-5 sm:mt-10 relative z-10 border border-orange-300">
        <div
          className="max-w-7xl mx-auto px-2 sm:px-4"
          style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
        >
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-8 border-b-4 border-orange-500 pb-2 justify-center flex">
            फोटो
          </h2>

          {/* Arrows */}
          <div className="absolute right-4 sm:right-8 top-[60px] sm:top-[70px] flex gap-2 z-10">
            <button
              onClick={() => scroll("left")}
              className="bg-orange-100 hover:bg-orange-300 p-2 rounded-full shadow-md transition"
            >
              <ChevronLeft className="text-orange-700 w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-orange-100 hover:bg-orange-300 p-2 rounded-full shadow-md transition"
            >
              <ChevronRight className="text-orange-700 w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-1 py-6 sm:py-8 cursor-grab hide-scrollbar"
          >
            {repeatedItems.map((item, idx) => (
              <div
                key={idx}
                className="snap-start min-w-[370px] lg:min-w-[300px] bg-gradient-to-br from-[#fffaf0] via-[#fcd5ce] to-[#fae1dd] border border-[#e4c6b7] rounded-[1.25rem] shadow-[4px_4px_8px_rgba(0,0,0,0.2)] p-3 relative transition-transform duration-300 hover:scale-[1.02] hover:rotate-[1deg]"
              >
                {/* Image Frame */}
                <div className="bg-white border border-gray-300 rounded-md p-2 shadow-inner mb-3 rotate-[-1.5deg]">
                  <img
                    src={`${BASE_URL}/uploads/representative/photos/${item.photo}`}
                    alt={item.title}
                    className="w-full h-44 sm:h-52 object-cover rounded-sm filter sepia-[10%] brightness-95"
                  />
                </div>

                {/* Tape / Pins */}
                <div className="absolute top-2 left-2 w-4 h-4 bg-orange-200 rotate-45 rounded-sm shadow-md" />
                <div className="absolute top-2 right-2 w-4 h-4 bg-orange-200 rotate-45 rounded-sm shadow-md" />

                {/* Text */}
                <div className="px-1">
                  <p className="text-sm sm:text-md text-[#e6611e] font-semibold mb-1">
                    {new Date(item.date).toLocaleDateString("en-GB")} |{" "}
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PhotoGalleryMain;
