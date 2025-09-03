import { Helmet } from 'react-helmet-async';
import NagrikSuvidha from '../../components/member_home_page/members-comp/nagrik-suvidha/NagrikSuvidha';
import useMember from './useMember';

const NagrikSuvidhaPage = () => {
    const { memberData: memberData } = useMember();

    return (
        <>
            <Helmet>
                <title>
                    {memberData?.name ? `नागरीक सुविधा | ${memberData?.name}` : 'नागरीक सुविधा'}
                </title>
                <meta
                    name="description"
                    content={
                        memberData?.name
                            ? `${memberData?.name} यांच्या समाजकार्याशी संबंधित विविध नागरीक सुविधा उपक्रमांची माहिती.`
                            : 'समाजकार्य व विविध उपक्रमांच्या खास छायाचित्रांचा संग्रह.'
                    }
                />
            </Helmet>

            <NagrikSuvidha />
        </>
    );
};

export default NagrikSuvidhaPage;
