import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BASE_URL } from "../../utils/apiClient";

const SamajKaryaSection = ({ cityData }) => {
  const scrollRef = useRef();
  const works = cityData?.works || [];

  // Repeat items for infinite scroll effect
  const repeatedItems = [...works, ...works, ...works];

  const scroll = (direction) => {
    if (direction === "left") scrollRef.current.scrollLeft -= 300;
    else scrollRef.current.scrollLeft += 300;
  };

  useEffect(() => {
    const container = scrollRef.current;
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScrollLeft = scrollWidth - clientWidth;
      if (scrollLeft <= 0) container.scrollLeft = scrollWidth / 3;
      else if (scrollLeft >= maxScrollLeft - 1)
        container.scrollLeft = scrollWidth / 3;
    };

    container.addEventListener("scroll", handleScroll);
    setTimeout(() => {
      container.scrollLeft = container.scrollWidth / 3;
    }, 100);

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center justify-start">
      <section className=" bg-gradient-to-br from-purple-50 via-pink-50 to-white  rounded-xl shadow-lg w-full max-w-8xl px-4 sm:px-6 py-6 mt-6 border border-orange-200">
        <div
          className="max-w-7xl mx-auto px-2 sm:px-4"
          style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
        >
          {/* Title */}
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-orange-600 mb-10 
        border-b-4 border-orange-500 pb-3 text-center tracking-wide"
          >
            समाजकार्य
          </h2>

          {/* Content Wrapper */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10"></div>

          {/* Navigation Arrows */}
          <div className="absolute right-4 sm:right-8 top-[120px] flex gap-2 z-10">
            <button
              onClick={() => scroll("left")}
              className="bg-orange-100 hover:bg-orange-300 p-2 rounded-full shadow-md"
            >
              <ChevronLeft className="text-orange-700 w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-orange-100 hover:bg-orange-300 p-2 rounded-full shadow-md"
            >
              <ChevronRight className="text-orange-700 w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Scrollable Album */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-8 cursor-grab hide-scrollbar"
          >
            {repeatedItems.map((item, idx) => (
              <div
                key={idx}
                className="snap-start min-w-[340px] bg-[#d3b593] rounded-xl shadow-lg relative transform transition duration-300 hover:scale-105 hover:rotate-1"
              >
                {/* Decorative Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-yellow-200 rotate-[-4deg] rounded-sm shadow-sm" />

                {/* Image */}
                <div className="bg-white p-2 rounded-lg shadow-inner rotate-[-2deg]">
                  <img
                    src={`${BASE_URL}/uploads/representative/work/${item.image}`}
                    alt={item.title}
                    className="w-full h-44 sm:h-52 object-cover rounded-md"
                  />
                </div>

                {/* Caption */}
                <div className="px-3 py-2 text-center">
                  <p className="text-md text-orange-800 font-semibold italic">
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

export default SamajKaryaSection;
