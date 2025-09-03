import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie, setCookie } from '../../utils/cookieUtils';
import { fetchRepresentativeById } from '../prabhagRepresentatives/representativeApi';
import { setMemberData } from '../../store/slices/representativeSlice';
import { toast } from 'react-toastify';

const useMember = () => {
    const memberData = useSelector((state) => state.representative.data);
    const dispatch = useDispatch();

    const load = async () => {
        const representativeId = memberData?._id || getCookie('representativeId');
        const domain = memberData?.domain || getCookie('domain');

        if (!domain) {
            console.warn('❌ No domain found, skipping fetch');
            return;
        }

        try {
            const repData = await fetchRepresentativeById(representativeId, domain);

            if (!repData) {
                toast.warn(repData?.message || 'डेटा उपलब्ध नाही.');
            } else {
                dispatch(setMemberData(repData));
                if (repData.politicalParty?._id) {
                    setCookie('politicalPartyId', repData.politicalParty._id);
                }
                if (repData._id) {
                    setCookie('representativeId', repData._id);
                }
            }
        } catch (err) {
            console.error('Failed to fetch representative:', err);

            // ✅ Show backend error if available
            const backendMessage = err.response?.data?.message || 'सर्व्हरशी कनेक्ट होत नाही.';
            toast.error(backendMessage);
        }
    };

    useEffect(() => {
        if (!memberData?._id) {
            load();
        }
    }, [memberData._id]);

    return { memberData };
};

export default useMember;
