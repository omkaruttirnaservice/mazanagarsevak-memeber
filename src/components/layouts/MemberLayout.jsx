// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import MemberBar from '../MemberBar';
import MemberFooter from '../MemberFooter';
import Navbar from '../Navbar';

const MemberLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />

            <div className="fixed top-20 left-0 w-full z-50">
                <Navbar />
            </div>
            <MemberBar />

            <main className="flex-grow mt-2">
                <Outlet />
            </main>

            <MemberFooter />
        </div>
    );
};

export default MemberLayout;
