import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
// import { fetchRepresentativeDetailsById } from "../../redux/slices/representativeSlice";
import { getCookie } from "../../utils/cookieUtils";
import SocialWorkSection from "../../components/member_home_page/members-comp/social-work/SocialWorkSection";
import { fetchRepresentativeDetailsById } from "../../store/slices/representativeSlice";

const SocialWorkPage = () => {
  const dispatch = useDispatch();
  const { data: representative } = useSelector((state) => state.representative);
  const representativeId = getCookie("representativeId");

  useEffect(() => {
    if (representativeId) {
      dispatch(fetchRepresentativeDetailsById(representativeId));
    }
  }, [dispatch, representativeId]);

  return (
    <>
      <Helmet>
        <title>
          {representative?.name
            ? `सामाजिक कार्य | ${representative.name}`
            : "सामाजिक कार्य"}
        </title>
        <meta
          name="description"
          content={
            representative?.name
              ? `${representative.name} यांच्या राजकीय आणि सामाजिक प्रवासाची माहिती व कार्य.`
              : "राजकीय आणि सामाजिक प्रवास. भारतीय विद्यार्थी सेनेत भूषवलेली पदे आणि महत्त्वाचे कार्य."
          }
        />
      </Helmet>

      <div className="min-h-screen relative flex flex-col items-center justify-start px-4 py-10 bg-gradient-to-b from-orange-200 via-white to-green-200">
        <SocialWorkSection />
      </div>
    </>
  );
};

export default SocialWorkPage;
