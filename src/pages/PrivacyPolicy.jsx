
const PrivacyPolicy = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-orange-200 via-white to-green-200 min-h-screen overflow-y-auto">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20"
        style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
      >
        <div className="bg-white shadow-2xl rounded-2xl p-10 md:p-14 space-y-8">
          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-orange-700 mb-8 drop-shadow-sm">
            Privacy Policy
          </h1>

          {/* Last Updated */}
          <p className="text-gray-500 text-center mb-6">
            <strong>Last Updated: 13 Nov,2025</strong>
          </p>

          {/* Sections */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                1. Collecting and Using Your Personal Data
              </h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>
                  {" "}
                  We do not collect, store, or share any of your personal data
                  with third parties.
                </strong>{" "}
                The application works entirely safely and only provides publicly
                available information about representatives.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                2. App Features
              </h2>
              <p className="text-gray-700 leading-relaxed">
                This app provides detailed information about representatives,
                including their work, history, biography, videos, images, and
                social media profiles. All the information is publicly
                available, and we do not share any personal data with
                third-party applications.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                3. Children's Privacy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our application is not intended for children under the age of
                13. We do not knowingly collect any personal information from
                children.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                4. Updates to This Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update our Privacy Policy from time to time. Any changes
                will be posted on this page, and the{" "}
                <strong>Last Updated</strong> date will be revised accordingly.
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-gray-500 text-sm mt-6 text-center">
            © {new Date().getFullYear()} Nagrik Suvicha. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
