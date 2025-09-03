import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/apiClient';

const MemberBar = () => {
    const { data: selectedMember } = useSelector((state) => state.representative);

    return (
        <>
            {selectedMember.representativephoto && (
                <div className="fixed bottom-1 lg:bottom-4 right-2 w-[70%] sm:w-[60%] md:w-[40%] lg:w-[35%] xl:w-[20%] max-w-sm bg-black/50 backdrop-blur-md text-white shadow-lg rounded-xl px-3 py-2 lg:py-2 flex items-center gap-3 z-50 animate-fade-in-slide">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white shadow animate-pulse-slow">
                        <img
                            src={`${BASE_URL}/uploads/representative/${selectedMember.representativephoto}`}
                            alt={selectedMember.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <h3 className="text-base sm:text-lg font-semibold truncate">
                            {selectedMember.name}
                        </h3>

                        <h3 className="font-semibold text-white text-sm">
                            संपर्क: <span className="text-white">{selectedMember.contactNo}</span>
                        </h3>
                    </div>
                </div>
            )}
        </>
    );
};

export default MemberBar;
