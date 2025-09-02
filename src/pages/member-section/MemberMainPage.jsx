
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
// import { fetchRepresentativeById } from "../prabhagRepresentatives/representativeApi";
import { getCookie, setCookie } from "../../utils/cookieUtils";
import { getDomain } from "../../utils/getDomain";
import axios from "axios";

// Components
import MemberIntroSlider from "../../components/member_home_page/MemberIntroSlider";
import SamajKaryaSection from "../../components/member_home_page/SamajKaryaSection";
import PhotoGalleryMain from "../../components/member_home_page/PhotoGalleryMain";
import VideoNewsMain from "../../components/member_home_page/VideoNewsMain";
import PartyDetails from "../../components/member_home_page/PartyDetails";
import MemberInfo from "../../components/member_home_page/MemberInfo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MemberMainPage = () => {
  const [cityData, setCityData] = useState(null);
  const { domain: paramDomain } = useParams(); // optional from route

 useEffect(() => {
    const load = async () => {
      const representativeId = getCookie("representativeId");
      const domain = paramDomain || localStorage.getItem("domain");

      console.log("Domain ****", domain);
      console.log("Representative ID ****", representativeId);

      if (!domain) {
        console.warn("❌ No domain found, skipping fetch");
        return;
      }
try {
  const res = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/representatives`,
    {
      params: { id: representativeId, domain },
    }
  );

  console.log("Rep Data (Direct API):", res.data);

  const repData = res.data?.data;
  if (repData) {
    setCityData(repData);

    if (repData?.politicalParty?._id) {
      setCookie("politicalPartyId", repData.politicalParty._id);
    }
  } else {
    // If no data but request was successful
    toast.warn(res.data?.message || "डेटा उपलब्ध नाही.");
  }
} catch (err) {
  console.error("Failed to fetch representative:", err);

  // ✅ Show backend error if available
  const backendMessage =
    err.response?.data?.message || "सर्व्हरशी कनेक्ट होत नाही.";
  toast.error(backendMessage);
}

    };

    load();
  }, [paramDomain]);


  const repName = cityData?.name || "";

  return (
    <>
      <Helmet>
        <title>
          {repName ? `सदस्य मुख्यपृष्ठ | ${repName}` : "सदस्य मुख्यपृष्ठ"}
        </title>
        <meta
          name="description"
          content={
            repName
              ? `${repName} यांची मुख्य माहिती, कार्य आणि सामाजिक योगदान पहा.`
              : "माननीय सदस्यांची मुख्य माहिती, कार्य आणि सामाजिक योगदान."
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
