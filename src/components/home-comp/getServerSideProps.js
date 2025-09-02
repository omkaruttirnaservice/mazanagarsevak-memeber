import { fetchCityWards } from "@/api/cityApi"; // Update path

export async function getServerSideProps() {
  const cityList = await fetchCityWards();

  return {
    props: {
      initialCityList: cityList,
    },
  };
}
