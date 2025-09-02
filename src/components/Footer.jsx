// components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#243c5a] via-[#1c3c52] to-[#2a506f] text-white py-10 mt-1">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-orange-400">
            Mazha Nagar Sevak
          </h2>
          <p className="mt-2 text-gray-200">
            Empowering citizens with accessible local governance and
            information.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-green-300">
            Contact Us
          </h3>
          <p className="text-gray-200">
            📍 Impulse Technosoft, Amrutdham Road, Panchavati, Nashik - 422003
          </p>
          <p className="text-gray-200 mt-2">📞 9579477779 / 9890211843</p>
          <p className="text-gray-200 mt-2">
            📧{" "}
            <a
              href="mailto:info@mazanagarsevak.com"
              className="underline hover:text-orange-400"
            >
              info@mazanagarsevak.com
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-green-300">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline hover:text-orange-400">
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:underline hover:text-orange-400"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:underline hover:text-orange-400"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-600 mt-10 pt-4 text-center text-gray-300 text-sm">
        &copy; {new Date().getFullYear()} Mazha Nagar Sevak. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
