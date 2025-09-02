import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import NagrikSuvidha from "../../components/member_home_page/members-comp/nagrik-suvidha/NagrikSuvidha";
import { fetchRepresentativeById } from "../prabhagRepresentatives/representativeApi";
import { getCookie } from "../../utils/cookieUtils";

const NagrikSuvidhaPage = () => {
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
          {repName ? `नागरीक सुविधा | ${repName}` : "नागरीक सुविधा"}
        </title>
        <meta
          name="description"
          content={
            repName
              ? `${repName} यांच्या समाजकार्याशी संबंधित विविध नागरीक सुविधा उपक्रमांची माहिती.`
              : "समाजकार्य व विविध उपक्रमांच्या खास छायाचित्रांचा संग्रह."
          }
        />
      </Helmet>

      <NagrikSuvidha />
    </>
  );
};

export default NagrikSuvidhaPage;
