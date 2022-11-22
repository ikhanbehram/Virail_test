import axios from "axios";

export const virailApiCall = async () => {
  const { data } = await axios.get(`https://search.virail.app/api/transport/v1/a.5128581/a.4887398/2022-11-23/0/1/com/en_us?currency=USD`);
  return data;
};

export const autoCompleteApi = async (value) => {
  const data = await axios.get(
    `https://autocomplete.virail.app/api/v1/search?q=${value}&locale_code=en_us&sort=city_population:desc`
  );
  return data;
};

