import axios from "axios";

export const virailApiCall = async ({from, to, date}) => {
  const { data } = await axios.get(`https://search.virail.app/api/transport/v1/${from}/${to.value}/${date}/0/1/com/en_us?currency=USD`);
  if (data?.progress  < 100) {
	return virailApiCall();
  }
  return {arrivalsData : data.result, label: to.label};
};

export const autoCompleteApi = async (value) => {
  const data = await axios.get(
    `https://autocomplete.virail.app/api/v1/search?q=${value}&locale_code=en_us&sort=city_population:desc`
  );
  return data;
};

