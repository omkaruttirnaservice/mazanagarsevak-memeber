import { Helmet } from 'react-helmet-async';
// import { fetchRepresentativeById } from "../prabhagRepresentatives/representativeApi";

// Components
import 'react-toastify/dist/ReactToastify.css';
import MemberInfo from '../../components/member_home_page/MemberInfo';
import MemberIntroSlider from '../../components/member_home_page/MemberIntroSlider';
import PartyDetails from '../../components/member_home_page/PartyDetails';
import PhotoGalleryMain from '../../components/member_home_page/PhotoGalleryMain';
import SamajKaryaSection from '../../components/member_home_page/SamajKaryaSection';
import VideoNewsMain from '../../components/member_home_page/VideoNewsMain';
import useMember from './useMember';

const MemberMainPage = () => {
    const { memberData: cityData } = useMember();

    const repName = cityData?.name || '';

    return (
        <>
            <Helmet>
                <title>{repName ? `सदस्य मुख्यपृष्ठ | ${repName}` : 'सदस्य मुख्यपृष्ठ'}</title>
                <meta
                    name="description"
                    content={
                        repName
                            ? `${repName} यांची मुख्य माहिती, कार्य आणि सामाजिक योगदान पहा.`
                            : 'माननीय सदस्यांची मुख्य माहिती, कार्य आणि सामाजिक योगदान.'
                    }
                />
            </Helmet>

            <div className="min-h-screen bg-gray-100">
                <MemberIntroSlider cityData={cityData} />
                <div className="min-h-screen relative items-center justify-start px-1 py-10 bg-gradient-to-b from-orange-200 via-white to-green-200">
                    {cityData && (
                        <>
                            <PartyDetails politicalParty={cityData?.politicalParty} />
                            <MemberInfo
                                biography={cityData.biography}
                                representativePhoto={cityData?.representativephoto}
                                name={cityData.name}
                                contactNo={cityData.contactNo}
                            />
                            <SamajKaryaSection cityData={cityData} />
                            <PhotoGalleryMain cityData={cityData} />
                            <VideoNewsMain videos={cityData.videos} />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default MemberMainPage;
