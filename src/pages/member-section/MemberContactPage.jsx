import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import ContactSection from "../../components/member_home_page/members-comp/contact-member/ContactSection";
import { fetchRepresentativeDetailsById } from "../../store/slices/representativeSlice";
import { getCookie } from "../../utils/cookieUtils"; // adjust import as per your project

const MemberContactPage = () => {
  const dispatch = useDispatch();
  const representative = useSelector((state) => state.representative.data);

  // Fetch ID from cookie (or route param)
  useEffect(() => {
    const id = getCookie("representativeId");
    if (id) dispatch(fetchRepresentativeDetailsById(id));
  }, [dispatch]);

  const repName = representative?.name || "";

  return (
    <>
      <Helmet>
        <title>{repName ? `संपर्क साधा | ${repName}` : "संपर्क साधा"}</title>
        <meta
          name="description"
          content={
            repName
              ? `${repName} यांच्याशी समाजकार्य व उपक्रमांसाठी संपर्क साधा.`
              : "समाजकार्य व विविध उपक्रमांच्या खास छायाचित्रांचा संग्रह."
          }
        />
      </Helmet>

      <ContactSection />
    </>
  );
};

export default MemberContactPage;
