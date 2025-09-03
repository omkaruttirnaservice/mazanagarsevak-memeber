import { useEffect, useRef, useState } from 'react';
import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp
} from 'react-icons/fa';
import { getCookie } from '../../../../utils/cookieUtils';
import { fetchServicesByRepresentative, fetchSubServicesByServiceId } from './servicesApi';

const NagrikSuvidha = ({ memberData }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [openCategory, setOpenCategory] = useState(null);
    const [subServices, setSubServices] = useState([]);
    const [showGovtSchemes, setShowGovtSchemes] = useState(false);

    const emergencyModalRef = useRef(null);
    const govtSchemeModalRef = useRef(null);

    const fetchNagrikSuvidha = async () => {
        const representativeId = getCookie('representativeId');
        try {
            const response = await fetchServicesByRepresentative(
                representativeId || memberData?._id
            );
            // Group services by category
            const grouped = {};
            response?.services?.forEach((item) => {
                const category = item.category || 'General';
                if (!grouped[category]) grouped[category] = [];
                grouped[category].push(item);
            });
            setData(grouped);
        } catch (err) {
            // console.error("Failed to load representative data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNagrikSuvidha();
    }, []);

    const handleCardClick = async (category) => {
        setOpenCategory(category);

        // Find the first service from this category to get its ID
        const firstService = data[category]?.[0];

        if (firstService?._id) {
            try {
                const result = await fetchSubServicesByServiceId(firstService._id);
                setSubServices(result); // Store sub-services
            } catch (err) {
                // console.error("Error loading sub-services:", err);
                setSubServices([]); // fallback
            }
        }
    };

    const closeModal = () => {
        setOpenCategory(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                openCategory &&
                emergencyModalRef.current &&
                !emergencyModalRef.current.contains(event.target)
            ) {
                closeModal();
            }

            if (
                showGovtSchemes &&
                govtSchemeModalRef.current &&
                !govtSchemeModalRef.current.contains(event.target)
            ) {
                setShowGovtSchemes(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openCategory, showGovtSchemes]);

    const handleCall = (phone) => {
        window.location.href = `tel:${phone}`;
    };

    if (loading) return <p className="text-center py-6">Loading...</p>;

    return (
        <div className="relative py-10 bg-gradient-to-b from-orange-200 via-white to-green-200 min-h-[90vh] mb-6 px-4 sm:px-6 lg:px-12 mt-28 overflow-hidden">
            {/* Floating decorative elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-10 animate-float1"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200 rounded-full opacity-10 animate-float2"></div>
            <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-200 rounded-full opacity-10 animate-float3"></div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-r from-orange-100 to-green-100 opacity-20"
                        style={{
                            width: `${Math.random() * 10 + 5}px`,
                            height: `${Math.random() * 10 + 5}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 20 + 10}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}></div>
                ))}
            </div>

            {/* Title with animated underline */}
            <div className="relative mb-12 text-center">
                <h2 className="text-4xl sm:text-5xl font-bold text-orange-700 mb-3 px-2 inline-block">
                    <span className="relative z-10">
                        नागरीक सुविधा
                        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-amber-400 to-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                    </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    सर्व सार्वजनिक सेवा एकाच ठिकाणी - सहज आणि सोप्या पध्दतीने
                </p>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-orange-400 to-green-400 rounded-full"></div>
            </div>

            {/* Category Cards with 3D hover effect */}

            <div className="flex flex-wrap justify-center gap-8 px-4 py-8">
                {[
                    'शासकीय योजना', // <-- Always render this first
                    ...Object.keys(data).filter((key) => key !== 'शासकीय योजना'), // <-- Then the rest
                ].map((category) => {
                    const isGovtScheme = category === 'शासकीय योजना';

                    if (isGovtScheme) {
                        return (
                            <div
                                key={category}
                                onClick={async () => {
                                    setShowGovtSchemes(true);

                                    const firstService = data['शासकीय योजना']?.[0];
                                    if (firstService?._id) {
                                        const result = await fetchSubServicesByServiceId(
                                            firstService._id
                                        );
                                        setSubServices(result?.[0]?.subServices || []);
                                    }
                                }}
                                className="relative group w-full md:w-[48%] lg:w-[28%] 
          bg-white/10 border border-transparent rounded-2xl p-[2px] 
          bg-gradient-to-br from-blue-400 via-blue-100 to-blue-400 
          shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                                <div
                                    className="relative rounded-[18px] bg-white/80 backdrop-blur-lg 
            p-5 min-h-[220px] max-h-[280px] flex flex-col justify-between overflow-hidden">
                                    <div
                                        className="w-14 h-14 bg-blue-100 border border-blue-300 text-blue-600 
              rounded-xl flex items-center justify-center text-3xl mb-4 shadow-inner 
              transition-transform duration-300 group-hover:scale-110">
                                        🏛️
                                    </div>

                                    <div className="absolute top-3 right-3 animate-bounce">
                                        <span
                                            className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white text-xs 
                font-bold px-3 py-1 rounded-full shadow-md">
                                            नवीन
                                        </span>
                                    </div>

                                    <h3 className="text-base font-extrabold text-gray-900 mb-1 tracking-tight">
                                        {category}
                                    </h3>
                                    <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-2">
                                        विविध शासकीय योजनांविषयी संपूर्ण माहिती
                                    </p>

                                    <div className="flex items-center gap-2 text-blue-700 text-sm font-semibold group-hover:text-blue-800 transition">
                                        अधिक माहिती
                                        <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    // Default design for other categories
                    return (
                        <div
                            key={category}
                            onClick={() => handleCardClick(category)}
                            className="relative group w-full md:w-[48%] lg:w-[28%] 
        bg-white/10 border border-transparent rounded-2xl p-[2px] 
        bg-gradient-to-br from-red-400 via-red-100 to-red-400 
        shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                            <div
                                className="relative rounded-[18px] bg-white/80 backdrop-blur-lg 
          p-5 min-h-[220px] max-h-[280px] flex flex-col justify-between overflow-hidden">
                                <div
                                    className="w-14 h-14 bg-red-100 border border-red-300 text-red-600 
            rounded-xl flex items-center justify-center text-3xl mb-4 shadow-inner 
            transition-transform duration-300 group-hover:scale-110">
                                    🚨
                                </div>

                                {/* <div className="absolute top-3 right-3 animate-bounce">
                  <span
                    className="bg-gradient-to-tr from-red-600 to-red-400 text-white text-xs 
              font-bold px-3 py-1 rounded-full shadow-md"
                  >
                    EMERGENCY
                  </span>
                </div> */}

                                <h3 className="text-base font-extrabold text-gray-900 mb-1 tracking-tight">
                                    {category}
                                </h3>

                                {data[category][0] && (
                                    <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-2">
                                        {data[category][0].description}
                                    </p>
                                )}

                                <div className="flex items-center gap-2 text-red-700 text-sm font-semibold group-hover:text-red-800 transition">
                                    सर्व सेवा पहा
                                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Emergency Services Modal */}
            {openCategory && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center px-4 py-6 sm:py-12 overflow-auto">
                    {/* <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-5xl relative max-h-[70vh] overflow-y-auto border-l-8 border-indigo-500"> */}
                    {/* Close Button */}
                    <div
                        ref={emergencyModalRef}
                        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-5xl relative max-h-[70vh] overflow-y-auto border-l-8 border-indigo-500">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-6 text-gray-500 hover:text-red-500 text-3xl transition-transform hover:rotate-90 z-50">
                            ×
                        </button>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-red-100 p-3 rounded-xl">
                                <span className="text-3xl text-red-500">🚨</span>
                            </div>
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                                    {openCategory}
                                </h3>
                                <p className="text-gray-600">सर्व संबंधित सेवा आणि संपर्क माहिती</p>
                            </div>
                        </div>

                        {/* Service Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {subServices.length > 0 ? (
                                subServices.map((service, idx) => {
                                    const nestedSubs = Array.isArray(service.subServices)
                                        ? service.subServices
                                        : [];

                                    return nestedSubs.map((sub, i) => (
                                        <div
                                            key={sub._id || `${idx}-${i}`}
                                            className="rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl group">
                                            <div className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-indigo-100 p-3 rounded-lg flex-shrink-0">
                                                        <span className="text-2xl text-indigo-600">
                                                            🏥
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                                            {sub.name}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            <span className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1">
                                                                <FaMapMarkerAlt className="text-gray-500" />{' '}
                                                                {sub.location}
                                                            </span>
                                                            <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1">
                                                                <FaPhoneAlt className="text-green-500" />{' '}
                                                                {sub.contact}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-4">
                                                    {sub.details}
                                                </p>
                                            </div>

                                            <div className="bg-gray-50 px-6 py-4 flex flex-wrap gap-3 justify-between items-center border-t border-gray-200">
                                                {sub.appliedLink && (
                                                    <a
                                                        href={sub.appliedLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-indigo-600 text-sm font-medium transition flex items-center gap-2 hover:text-indigo-800 group">
                                                        <span className="group-hover:underline">
                                                            ऑनलाइन लिंक
                                                        </span>
                                                        <FaExternalLinkAlt className="text-xs" />
                                                    </a>
                                                )}

                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleCall(sub.contact)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm rounded-lg shadow hover:bg-green-600 transition">
                                                        <FaPhoneAlt /> कॉल करा
                                                    </button>
                                                    <a
                                                        href={`https://wa.me/${sub.contact}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg shadow hover:bg-green-700 transition">
                                                        <FaWhatsapp /> WhatsApp
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ));
                                })
                            ) : (
                                <div className="col-span-2 flex flex-col items-center justify-center py-10">
                                    <div className="bg-gray-100 p-6 rounded-full mb-5">
                                        <FaInfoCircle className="text-5xl text-gray-400" />
                                    </div>
                                    <h4 className="text-xl font-medium text-gray-700 mb-2">
                                        No services available
                                    </h4>
                                    <p className="text-gray-500 text-center max-w-md">
                                        Currently there are no sub-services listed for this
                                        category. Please check back later.
                                    </p>
                                </div>
                            )}

                            {/* {subServices.length > 0 ? (
                subServices.map((service) =>
                  service.subServices.map((sub, i) => (
                    <div
                      key={sub._id || i}
                      className="rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl group"
                    >
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-indigo-100 p-3 rounded-lg flex-shrink-0">
                            <span className="text-2xl text-indigo-600">🏥</span>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                              {sub.name}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              <span className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1">
                                <FaMapMarkerAlt className="text-gray-500" />{" "}
                                {sub.location}
                              </span>
                              <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1">
                                <FaPhoneAlt className="text-green-500" />{" "}
                                {sub.contact}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-4">
                          {sub.details}
                        </p>
                      </div>

                      <div className="bg-gray-50 px-6 py-4 flex flex-wrap gap-3 justify-between items-center border-t border-gray-200">
                        {sub.appliedLink && (
                          <a
                            href={sub.appliedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 text-sm font-medium transition flex items-center gap-2 hover:text-indigo-800 group"
                          >
                            <span className="group-hover:underline">
                              ऑनलाइन लिंक
                            </span>
                            <FaExternalLinkAlt className="text-xs" />
                          </a>
                        )}

                        <div className="flex gap-3">
                          <button
                            onClick={() => handleCall(sub.contact)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm rounded-lg shadow hover:bg-green-600 transition"
                          >
                            <FaPhoneAlt /> कॉल करा
                          </button>
                          <a
                            href={`https://wa.me/${sub.contact}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg shadow hover:bg-green-700 transition"
                          >
                            <FaWhatsapp /> WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : (
                <div className="col-span-2 flex flex-col items-center justify-center py-10">
                  <div className="bg-gray-100 p-6 rounded-full mb-5">
                    <FaInfoCircle className="text-5xl text-gray-400" />
                  </div>
                  <h4 className="text-xl font-medium text-gray-700 mb-2">
                    No services available
                  </h4>
                  <p className="text-gray-500 text-center max-w-md">
                    Currently there are no sub-services listed for this
                    category. Please check back later.
                  </p>
                </div>
              )} */}
                        </div>
                    </div>
                </div>
            )}

            {/* Government Schemes Modal */}
            {showGovtSchemes && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center px-4 py-6 sm:py-12 overflow-auto">
                    {/* <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-5xl relative max-h-[70vh] overflow-y-auto border-l-8 border-indigo-500"> */}
                    {/* Close Button */}
                    <div
                        ref={govtSchemeModalRef}
                        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-5xl relative max-h-[70vh] overflow-y-auto border-l-8 border-indigo-500">
                        <button
                            onClick={() => setShowGovtSchemes(false)}
                            className="absolute top-4 right-6 text-gray-500 hover:text-red-500 text-3xl transition-transform hover:rotate-90 z-50">
                            ×
                        </button>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-indigo-100 p-3 rounded-xl">
                                <span className="text-3xl text-indigo-600">🏛️</span>
                            </div>
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                                    शासकीय योजना
                                </h3>
                                <p className="text-gray-600">
                                    सर्व लोकप्रिय सरकारी योजना आणि त्यांचे संकेतस्थळ
                                </p>
                            </div>
                        </div>

                        {/* Scheme Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {subServices.length > 0 ? (
                                subServices.map((scheme, index) => (
                                    <div
                                        key={scheme._id || index}
                                        className="rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl group">
                                        <div className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className={`bg-indigo-100 p-3 rounded-lg flex-shrink-0`}>
                                                    <span className="text-2xl text-indigo-600">
                                                        {scheme.icon || '📋'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                                        {scheme.name}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {scheme.location && (
                                                            <span className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1">
                                                                <FaMapMarkerAlt className="text-gray-500" />
                                                                {scheme.location}
                                                            </span>
                                                        )}
                                                        {scheme.contact && (
                                                            <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1">
                                                                <FaPhoneAlt className="text-green-500" />
                                                                {scheme.contact}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-4">
                                                {scheme.desc || scheme.details}
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 px-6 py-4 flex flex-wrap gap-3 justify-between items-center border-t border-gray-200">
                                            {/* Applied Link */}
                                            {scheme.appliedLink && (
                                                <a
                                                    href={scheme.appliedLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-indigo-600 text-sm font-medium transition flex items-center gap-2 hover:text-indigo-800 group">
                                                    <span className="group-hover:underline">
                                                        योजना संकेतस्थळ
                                                    </span>
                                                    <FaExternalLinkAlt className="text-xs" />
                                                </a>
                                            )}

                                            {/* Action Buttons */}
                                            {scheme.contact && (
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleCall(scheme.contact)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm rounded-lg shadow hover:bg-green-600 transition">
                                                        <FaPhoneAlt /> कॉल करा
                                                    </button>
                                                    <a
                                                        href={`https://wa.me/${scheme.contact}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg shadow hover:bg-green-700 transition">
                                                        <FaWhatsapp /> WhatsApp
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2 flex flex-col items-center justify-center py-10">
                                    <div className="bg-gray-100 p-6 rounded-full mb-5">
                                        <FaInfoCircle className="text-5xl text-gray-400" />
                                    </div>
                                    <h4 className="text-xl font-medium text-gray-700 mb-2">
                                        कोणतीही योजना सापडली नाही
                                    </h4>
                                    <p className="text-gray-500 text-center max-w-md">
                                        सध्या या श्रेणीसाठी कोणत्याही योजना सूचीबद्ध नाहीत. कृपया
                                        नंतर पुन्हा तपासा.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NagrikSuvidha;
