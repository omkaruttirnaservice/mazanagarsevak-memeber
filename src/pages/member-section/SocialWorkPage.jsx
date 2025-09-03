import { Helmet } from 'react-helmet-async';
// import { fetchRepresentativeDetailsById } from "../../redux/slices/representativeSlice";
import SocialWorkSection from '../../components/member_home_page/members-comp/social-work/SocialWorkSection';
import useMember from './useMember';

const SocialWorkPage = () => {
    const { memberData: representative } = useMember();

    return (
        <>
            <Helmet>
                <title>
                    {representative?.name
                        ? `सामाजिक कार्य | ${representative.name}`
                        : 'सामाजिक कार्य'}
                </title>
                <meta
                    name="description"
                    content={
                        representative?.name
                            ? `${representative.name} यांच्या राजकीय आणि सामाजिक प्रवासाची माहिती व कार्य.`
                            : 'राजकीय आणि सामाजिक प्रवास. भारतीय विद्यार्थी सेनेत भूषवलेली पदे आणि महत्त्वाचे कार्य.'
                    }
                />
            </Helmet>

            <div className="min-h-screen relative flex flex-col items-center justify-start px-4 py-10 bg-gradient-to-b from-orange-200 via-white to-green-200">
                <SocialWorkSection memberData={representative} />
            </div>
        </>
    );
};

export default SocialWorkPage;
