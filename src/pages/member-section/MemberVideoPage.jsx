// pages/VideoPage.jsx
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import VideoGallery from "../../components/member_home_page/members-comp/video-section/VideoGallery";
import { fetchRepresentativeById } from "../prabhagRepresentatives/representativeApi";
import { getCookie } from "../../utils/cookieUtils";

const MemberVideoPage = () => {
  const [repName, setRepName] = useState("");

  useEffect(() => {
    const load = async () => {
      const representativeId = getCookie("representativeId");
      if (representativeId) {
        try {
          const data = await fetchRepresentativeById(representativeId);
          if (data?.name) setRepName(data.name);
        } catch (error) {
          // console.error("Error fetching representative:", error);
        }
      }
    };
    load();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {repName ? `व्हिडिओ गॅलरी | ${repName}` : "व्हिडिओ गॅलरी"}
        </title>
        <meta
          name="description"
          content={
            repName
              ? `${repName} यांचे उद्घाटन, रॅली, आंदोलन व इतर सर्व व्हिडिओ येथे पहा.`
              : "नाशिक मधील आमचे सर्व व्हिडिओ येथे पहा. उद्घाटन, रॅली, आंदोलन इत्यादी."
          }
        />
      </Helmet>

      <VideoGallery />
    </>
  );
};

export default MemberVideoPage;
