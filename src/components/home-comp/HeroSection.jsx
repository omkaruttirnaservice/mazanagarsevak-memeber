import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import images from "../../assets/hero_bg_image"; // make sure this has index.js exporting array

const HeroSection = () => {
  return (
    <section className="relative w-full h-[61vh] overflow-hidden">
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
        className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-20"
        style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
      >
        <h1 className="text-white text-3xl md:text-3xl font-extrabold drop-shadow-lg  lg:text-5xl leading-snug mb-4">
          आता मिळवा आपल्या प्रभागातील सर्व विकास कामांची माहीती <br />
          फक्त एका क्लिक मध्ये.
        </h1>
        <p className="text-lg md:text-xl font-medium max-w-2xl">
          तसेच आपल्या प्रभागातील समस्या आपल्या प्रभागातील उमेदवारांकडे
          मांडण्याची सुविधा.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
