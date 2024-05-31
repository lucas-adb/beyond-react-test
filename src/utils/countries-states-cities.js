export const fetchCountries = async () => {
  let headers = new Headers();
  headers.append("X-CSCAPI-KEY", import.meta.env.VITE_CSC_APIKEY);

  let requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://api.countrystatecity.in/v1/countries",
      requestOptions,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};
