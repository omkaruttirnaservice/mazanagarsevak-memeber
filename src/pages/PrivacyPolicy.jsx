import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="py-30 bg-gradient-to-b from-orange-200 via-white to-green-200 min-h-screen overflow-y-auto">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
      >
       

        <div className="bg-white shadow-2xl rounded-2xl p-10 md:p-14 space-y-6">
             <h1 className="text-4xl font-bold text-center text-orange-700 mb-12 drop-shadow-sm">
          Privacy Policy
        </h1>
          <p className="text-gray-700 leading-relaxed">
            Welcome to the Privacy Policy of your Mazha Nagar Sevak project. We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may collect personal information such as your name, mobile number, email address, and any other data you provide while using our services. We also collect non-personal information for improving our platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              The information we collect is used to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Provide and maintain our services</li>
              <li>Communicate important updates and notifications</li>
              <li>Analyze and improve user experience</li>
              <li>Ensure security and prevent fraudulent activities</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              3. Sharing Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We respect your privacy and do not sell your personal information. Data may be shared with trusted third parties only to provide services or comply with legal obligations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              4. Cookies and Tracking
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar technologies to enhance your experience, analyze traffic, and provide personalized content. You can manage your cookie preferences in your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              5. Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is completely secure.
            </p>
          </div>
          <p className="text-gray-500 text-sm mt-6 text-center">
            © {new Date().getFullYear()} Mazha Nagar Sevak. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
