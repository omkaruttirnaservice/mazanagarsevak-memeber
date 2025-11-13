import { useState } from "react";
import { FiUsers, FiMessageSquare, FiMail, FiMapPin } from "react-icons/fi";
import { createUser } from "../pages/prabhagRepresentatives/representativeApi";
import { Link } from "react-router-dom";

const MemberFooter = () => {
  const [email, setEmail] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !pinCode) {
      alert("कृपया सर्व माहिती भरा!");
      return;
    }

    try {
      setLoading(true);
      const res = await createUser(email, pinCode);
      if (res.success) {
        alert("फॉर्म यशस्वीरित्या सबमिट झाला आहे!");
        setEmail("");
        setPinCode("");
      } else {
        alert("त्रुटी: कृपया पुन्हा प्रयत्न करा.");
      }
    } catch (error) {
      alert(error.message || "Server error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-[#243c5a] via-[#1c3c52] to-[#2a506f] border-t border-blue-200 mt-12 px-4 py-10 sm:py-12 shadow-inner">
      {/* Title */}
      <div
        className="text-center mb-8 px-2"
        style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
          स्वप्न विकासाचे , स्वप्न विकसित प्रभागाचे
        </h2>
        <p className="text-sm sm:text-base text-white mt-2">
          प्रभागाचे विकासासाठी, लोकांच्या गरजांसाठी
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-center justify-between">
        {/* Cards */}
        <div className="grid grid-cols-2 gap-3 w-full lg:w-2/3 lg:h-[22vh]">
          <Link to="/contact-member" className="block h-full">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition text-center flex items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="text-blue-600 text-2xl sm:text-3xl mb-2">
                  <FiMessageSquare />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-blue-800">
                  आमच्याशी जोडले जा
                </h3>
              </div>
            </div>
          </Link>

          <Link to="/videos" className="block h-full">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition text-center flex items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="text-blue-600 text-2xl sm:text-3xl mb-2">
                  <FiMessageSquare />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-blue-800">
                  बातम्या
                </h3>
              </div>
            </div>
          </Link>

           <Link to="/privacy-policy" className="block h-full">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition text-center flex items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="text-blue-600 text-2xl sm:text-3xl mb-2">
                  <FiMessageSquare />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-blue-800">
                  Privacy Policy
                </h3>
              </div>
            </div>
          </Link>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-xl shadow-md w-full lg:w-2/3 min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
            आमच्याशी जोडले जा
          </h3>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                तुमचा ई-मेल ऍड्रेस
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <FiMail />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                पिन कोड
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <FiMapPin />
                </span>
                <input
                  type="text"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="पिन कोड"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-md hover:from-blue-700 hover:to-indigo-700 transition font-semibold"
              disabled={loading}
            >
              {loading ? "सबमिट करत आहे..." : "पाठवा"}
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default MemberFooter;
