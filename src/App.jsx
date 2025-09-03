import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MemberLayout from './components/layouts/MemberLayout';
import AboutMemberPage from './pages/member-section/AboutMemberPage';
import MemberContactPage from './pages/member-section/MemberContactPage';
import MemberGalleryPage from './pages/member-section/MemberGalleryPage';
import MemberMainPage from './pages/member-section/MemberMainPage';
import MemberVideoPage from './pages/member-section/MemberVideoPage';
import NagrikSuvidhaPage from './pages/member-section/NagrikSuvidhaPage';
import PoliticalPartyPage from './pages/member-section/PartyDetailsPage';
import SocialWorkPage from './pages/member-section/SocialWorkPage';
import { setCookie } from './utils/cookieUtils';
import useMember from './pages/member-section/useMember';

function App() {
    const [domain, setDomain] = useState('');
    const [domainNotFound, setDomainNotFound] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let current = window.location.host;

            if (!current) {
                setDomainNotFound(true);
                return;
            }

            if (current.startsWith('localhost')) {
                current = 'localhost:5174';
            }

            setDomain(current);
            setCookie('domain', current);
        } else {
            setDomainNotFound(true);
        }
    }, []);

    const handleReload = () => {
        window.location.reload();
    };
    if (domainNotFound) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'Arial' }}>
                <h2>⚠️ डोमेन ओळखण्यात अयशस्वी.</h2>
                <p>डेटा मिळवण्यासाठी कृपया पृष्ठ पुन्हा लोड करा.</p>
                <button
                    onClick={handleReload}
                    style={{
                        marginTop: '1rem',
                        padding: '0.6rem 1.2rem',
                        fontSize: '1rem',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}>
                    🔄 पुन्हा लोड करा
                </button>
            </div>
        );
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<MemberLayout />}>
                    <Route index element={<MemberMainPage />} />
                    <Route path="about-member" element={<AboutMemberPage />} />
                    <Route path="social-work" element={<SocialWorkPage />} />
                    <Route path="videos" element={<MemberVideoPage />} />
                    <Route path="images" element={<MemberGalleryPage />} />
                    <Route path="about-party" element={<PoliticalPartyPage />} />
                    <Route path="contact-member" element={<MemberContactPage />} />
                    <Route path="nagrik-suvidha" element={<NagrikSuvidhaPage />} />
                    <Route path="*" element={<MemberMainPage />} />
                </Route>
            </Routes>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default App;
