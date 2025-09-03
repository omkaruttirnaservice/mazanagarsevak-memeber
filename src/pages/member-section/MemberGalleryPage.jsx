import { Helmet } from 'react-helmet-async';

import GallerySection from '../../components/member_home_page/members-comp/photo-gallery/GallerySection';
import useMember from './useMember';

const MemberGalleryPage = () => {
    const { memberData: representative } = useMember();

    const repName = representative?.name || '';

    return (
        <>
            <Helmet>
                <title>{repName ? `फोटो संग्रह | ${repName}` : 'फोटो संग्रह'}</title>
                <meta
                    name="description"
                    content={
                        repName
                            ? `${repName} यांच्या समाजकार्य व विविध उपक्रमांच्या खास छायाचित्रांचा संग्रह.`
                            : 'समाजकार्य व विविध उपक्रमांच्या खास छायाचित्रांचा संग्रह.'
                    }
                />
            </Helmet>

            <GallerySection />
        </>
    );
};

export default MemberGalleryPage;
