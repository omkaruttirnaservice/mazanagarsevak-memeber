import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { getRepresentativeDetails } from "./contactMemberApi";
import { getCookie } from "../../../../utils/cookieUtils";

const ContactSection = () => {
  const [rep, setRep] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const representativeId = getCookie("representativeId");
      const result = await getRepresentativeDetails(representativeId);
      setRep(result);
    };
    fetchData();
  }, []);

  if (!rep) return null;

  return (
    <section className="bg-gradient-to-b from-orange-200 via-white to-green-200 py-20 px-2 lg:px-6 mt-20">
      <h2 className="text-3xl md:text-3xl font-bold text-orange-800 mb-4 flex items-center gap-2 pl-9">
        संपर्क साधा
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT: Info */}
        <div
          className="shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] rounded-2xl p-8 border-4 border-orange-400 relative w-full "
          style={{
            backgroundImage: `repeating-linear-gradient(to bottom, #fdf6e3, #fdf6e3 23px, #e6d8c3 24px)`,
            fontFamily: '"Noto Sans Devanagari", sans-serif',
          }}
        >
          <div className="absolute top-4 right-4 text-orange-300 text-3xl">
            🖊️
          </div>

          <h2 className="text-4xl font-bold text-orange-600 mb-2">
            {rep.name}
          </h2>
          <h4 className="text-2xl text-gray-700 font-semibold mb-1">
            {rep.position}
          </h4>
          <h5 className="text-xl text-gray-600 font-medium mb-6">
            {rep.politicalParty?.name}
          </h5>

          <div className="text-lg text-gray-700 space-y-4 leading-relaxed">
            {rep.contactNo && (
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-orange-500" /> मो. {rep.contactNo}
              </p>
            )}
            {rep.email && (
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-green-600" /> {rep.email}
              </p>
            )}

            {rep.address?.map((addr, idx) => (
              <div key={idx}>
                <p className="flex items-center gap-2 font-semibold">
                  <FaMapMarkerAlt className="text-blue-500" /> कार्यालय{" "}
                  {idx + 1}:
                </p>
                <p className="ml-6 whitespace-pre-line">
                  {addr.line1}, {addr.line2}
                  {"\n"}
                  {addr.taluka}, {addr.dist}, {addr.state} - {addr.pincode}
                  {addr.nearbyLandmarks && `\nजवळपास: ${addr.nearbyLandmarks}`}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Maps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Title only for small screens */}
          <h3 className="block sm:hidden text-xl font-semibold text-orange-700 col-span-full mb-2 px-2">
            नकाशा स्थान
          </h3>

          {rep.address?.map((addr, idx) => {
            const lat = addr.lat;
            const lng = addr.lan;
            const mapUrl =
              lat && lng
                ? `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`
                : null;

            return (
              <div
                key={idx}
                className="rounded-xl border-4 border-[#d68029] shadow-lg overflow-hidden"
                style={{
                  background:
                    "url(https://www.transparenttextures.com/patterns/old-mathematics.png)",
                  backgroundColor: "#f5f5dc",
                  padding: "0.5rem",
                }}
              >
                {mapUrl ? (
                  <iframe
                    title={`Office ${idx + 1} Map`}
                    src={mapUrl}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                ) : (
                  <div className="text-gray-600 text-center p-4">
                    नकाशाची माहिती उपलब्ध नाही
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
