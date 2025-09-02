import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const VideoNewsMain = ({ videos }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 400;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-start mt-9">
      <section className="bg-gradient-to-br from-purple-100 via-pink-50 to-white rounded-xl shadow-2xl w-full max-w-8xl px-6 py-5 mt-3 relative z-10 border border-orange-300">
        <div
          className="max-w-7xl mx-auto"
          style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
        >
          {/* Title */}
          <h2 className="text-3xl font-bold text-orange-600 mb-5 border-b-4 border-orange-500 pb-2 justify-center flex">
            विडिओ बातम्या
          </h2>

          {/* Scroll Buttons */}
          <div className="flex justify-end gap-3 mb-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 bg-orange-100 hover:bg-orange-300 transition rounded-full shadow-md"
            >
              <ChevronLeft className="text-orange-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 bg-orange-100 hover:bg-orange-300 transition rounded-full shadow-md"
            >
              <ChevronRight className="text-orange-600" />
            </button>
          </div>

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth snap-x snap-mandatory pb-2 hide-scrollbar"
          >
            {videos?.map((item, idx) => (
              <div
                key={item._id || idx}
                className="min-w-[320px] max-w-sm flex-shrink-0 bg-gradient-to-br from-[#fffaf0] via-[#fcd5ce] to-[#fae1dd] border border-[#e4c6b7] rounded-[1.25rem] shadow-[4px_4px_8px_rgba(0,0,0,0.2)] p-3 relative transition-transform duration-300 hover:scale-[1.02] hover:rotate-[1deg] snap-start"
              >
                {/* Retro Frame */}
                <div className="bg-white border border-gray-300 rounded-lg p-2 shadow-inner mb-3 rotate-[-1.5deg] relative">
                  <iframe
                    src={item.videoUrl}
                    title={item.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-56 rounded-md filter sepia-[10%] brightness-95"
                  ></iframe>

                  {/* Decorative Pins */}
                  <div className="absolute top-2 left-2 w-3 h-3 bg-[#d4bfa2] rounded-full shadow-sm" />
                  <div className="absolute top-2 right-2 w-3 h-3 bg-[#d4bfa2] rounded-full shadow-sm" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 bg-[#d4bfa2] rounded-full shadow-sm" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 bg-[#d4bfa2] rounded-full shadow-sm" />
                </div>

                {/* Text Content */}
                <div className="px-1">
                  <p className="text-md text-[#e6611e] font-semibold mb-1">
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

export default VideoNewsMain;
