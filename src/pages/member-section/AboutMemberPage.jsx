import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import AboutMembers from "../../components/member_home_page/members-comp/AboutMembers";
import PoliticalJourney from "../../components/member_home_page/members-comp/PoliticalJourney";
import { fetchRepresentativeById } from "../prabhagRepresentatives/representativeApi";
import { getCookie } from "../../utils/cookieUtils";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepresentativeDetailsById } from "../../store/slices/representativeSlice";

const AboutMemberPage = () => {
  const [repData, setRepData] = useState(null);
  const dispatch = useDispatch();

  const { data: representative, loading } = useSelector(
    (state) => state.representative
  );
  const representativeId = getCookie("representativeId");

  useEffect(() => {
    const fetchData = async () => {
      const rep = await fetchRepresentativeById(representativeId);
      setRepData(rep);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (representativeId)
      dispatch(fetchRepresentativeDetailsById(representativeId));
  }, [representativeId, dispatch]);

  return (
    <>
      <Helmet>
        <title>
          {representative?.name
            ? `राजकीय प्रवास | ${representative.name}`
            : "राजकीय प्रवास"}
        </title>
        <meta
          name="description"
          content={
            representative?.name
              ? `${representative.name} यांच्या सामाजिक कार्य प्रवासाची माहिती येथे वाचा...`
              : "या सामाजिक कार्य प्रवासाची माहिती येथे वाचा..."
          }
        />
      </Helmet>
      <div className="min-h-screen bg-fixed bg-center bg-cover relative flex flex-col items-center justify-start px-1 lg:px-4 py-10 bg-gradient-to-b from-orange-200 via-white to-green-200">
        {repData && (
          <>
            <AboutMembers
              photo={repData?.representativephoto}
              description={repData?.biography}
              name={repData?.name}
              facebook={repData?.facebook}
              twitter={repData?.twitter}
              instagram={repData?.instagram}
              youtube={repData?.youtube}
            />

            <PoliticalJourney
              careerHistory={repData.careerHistory || []}
              workImages={(repData.works || [])
                .map((work) => work.image)
                .slice(0, 2)} // ✅ Only first 2 images
            />
          </>
        )}
      </div>
    </>
  );
};

export default AboutMemberPage;
