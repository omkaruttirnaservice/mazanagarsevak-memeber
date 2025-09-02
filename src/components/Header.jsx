import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const representative = useSelector((state) => state.representative.data);
    const location = useLocation();

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // ✅ If representative has photo use that, otherwise fallback logo
    const imageSrc = representative?.representativephoto
        ? `${BASE_URL}/uploads/representative/${representative.representativephoto}`
        : '/logo.jpg';

    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

    // ✅ simple nav config
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#1c3c52] shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo & Title */}
                <div className="flex items-center gap-4 text-white">
                    <img
                        src={imageSrc}
                        alt={representative?.name || 'Representative'}
                        className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover"
                    />
                    <h1 className="text-lg md:text-2xl font-extrabold tracking-wide">
                        {representative?.name || 'माझा नगर सेवक'}
                    </h1>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={toggleMobileMenu}
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'} // ✅ accessibility
                >
                    {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#1c3c52] px-4 pb-4">
                    <nav className="flex flex-col gap-3">
                        {navItems.map(({ name, path }) => (
                            <Link
                                key={name}
                                to={path}
                                className={`text-white text-base font-medium border-b pb-2 ${
                                    location.pathname === path
                                        ? 'text-orange-400'
                                        : 'border-gray-600'
                                }`}
                                onClick={() => setMobileMenuOpen(false)}>
                                {name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
