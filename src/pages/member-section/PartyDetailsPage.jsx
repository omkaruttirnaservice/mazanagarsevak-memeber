import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import MembersPartyDetails from "../../components/member_home_page/members-comp/party-details/MembersPartyDetails";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/cookieUtils";
import { fetchRepresentativeDetailsById } from "../../store/slices/representativeSlice";

const PoliticalPartyPage = () => {
  const dispatch = useDispatch();
  const { data: representative } = useSelector((state) => state.representative);

  const representativeId = getCookie("representativeId");

  // useEffect(() => {
  //   if (representativeId) {
  //     dispatch(fetchRepresentativeDetailsById(representativeId));
  //   }
  // }, [dispatch, representativeId]);

  return (
    <>
      <Helmet>
        <title>
          {representative?.name
            ? `पक्ष माहिती | ${representative.name} `
            : "पक्ष माहिती"}
        </title>
        <meta
          name="description"
          content={
            representative?.name
              ? `${representative.name} यांच्या पक्षाची सविस्तर माहिती व कार्य.`
              : "पक्षाची सविस्तर माहिती."
          }
        />
      </Helmet>
      <MembersPartyDetails />
    </>
  );
};

export default PoliticalPartyPage;
