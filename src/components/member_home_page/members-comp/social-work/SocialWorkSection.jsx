import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../../utils/apiClient';
import { getCookie } from '../../../../utils/cookieUtils';
import { fetchSocialWorksByRepresentative } from './workServiceApi';

const fadeSlide = (direction) => ({
    hidden: { opacity: 0, x: direction === 'left' ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
});

export default function SocialWorkSection({ memberData }) {
    const [works, setWorks] = useState([]);

    useEffect(() => {
        const loadWorks = async () => {
            const representativeId = getCookie('representativeId');
            if (!representativeId) return;

            const fetchedWorks = await fetchSocialWorksByRepresentative(representativeId);
            setWorks(fetchedWorks);
        };

        loadWorks();
    }, []);

    return (
        <section className="mt-30">
            <div
                className="container mx-auto px-2 sm:px-4 space-y-8"
                style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-orange-800 mb-6 flex items-center gap-2">
                    सामाजिक कार्य
                </h2>

                {works.length === 0 && (
                    <p className="text-gray-500 text-center italic">
                        कोणतेही सामाजिक कार्य उपलब्ध नाही.
                    </p>
                )}

                {works.map((work, index) => (
                    <motion.div
                        key={work._id}
                        initial="hidden"
                        animate="visible"
                        variants={fadeSlide(index % 2 === 0 ? 'left' : 'right')}
                        className={`flex flex-col md:flex-row ${
                            index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                        } w-full bg-gradient-to-br from-orange-50 via-white to-orange-100 
          shadow-lg border border-orange-200 rounded-xl overflow-hidden 
          transition-transform duration-500 hover:scale-[1.01]`}>
                        {/* Image */}
                        <div className="w-full md:w-[35%]">
                            <img
                                src={`${BASE_URL}/uploads/representative/work/${work.image}`}
                                alt={work.title}
                                className="w-full h-48 sm:h-64 md:h-full object-cover object-center"
                            />
                        </div>

                        {/* Text */}
                        <div className="w-full md:w-[65%] p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 text-gray-800 flex flex-col justify-center">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-700">
                                {work.title}
                            </h3>
                            <p className="text-sm sm:text-base md:text-lg leading-relaxed tracking-wide">
                                {work.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
