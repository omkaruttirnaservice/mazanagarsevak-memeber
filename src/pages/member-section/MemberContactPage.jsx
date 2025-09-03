import { Helmet } from 'react-helmet-async';
import ContactSection from '../../components/member_home_page/members-comp/contact-member/ContactSection';
import useMember from './useMember';

const MemberContactPage = () => {

    const { memberData: representative } = useMember();

    const repName = representative?.name || '';

    return (
        <>
            <Helmet>
                <title>{repName ? `संपर्क साधा | ${repName}` : 'संपर्क साधा'}</title>
                <meta
                    name="description"
                    content={
                        repName
                            ? `${repName} यांच्याशी समाजकार्य व उपक्रमांसाठी संपर्क साधा.`
                            : 'समाजकार्य व विविध उपक्रमांच्या खास छायाचित्रांचा संग्रह.'
                    }
                />
            </Helmet>

            <ContactSection />
        </>
    );
};

export default MemberContactPage;
