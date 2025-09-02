

import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import GallerySection from "../../components/member_home_page/members-comp/photo-gallery/GallerySection";
import { fetchRepresentativeDetailsById } from "../../store/slices/representativeSlice";
import { getCookie } from "../../utils/cookieUtils";
import { getDomain } from "../../utils/getDomain";

const MemberGalleryPage = () => {
  const dispatch = useDispatch();
  const representative = useSelector((state) => state.representative.data);
  const { domain: paramDomain } = useParams();
  const domain = getDomain(paramDomain);

  useEffect(() => {
    const id = getCookie("representativeId");
    if (id && domain) {
      dispatch(fetchRepresentativeDetailsById({ id, domain }));
    }
  }, [dispatch, domain]);

  const repName = representative?.name || "";

  return (
    <>
      <Helmet>
        <title>{repName ? `फोटो संग्रह | ${repName}` : "फोटो संग्रह"}</title>
        <meta
          name="description"
          content={
            repName
              ? `${repName} यांच्या समाजकार्य व विविध उपक्रमांच्या खास छायाचित्रांचा संग्रह.`
              : "समाजकार्य व विविध उपक्रमांच्या खास छायाचित्रांचा संग्रह."
          }
        />
      </Helmet>

      <GallerySection />
    </>
  );
};

export default MemberGalleryPage;
