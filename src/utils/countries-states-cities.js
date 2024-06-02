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

export const fetchStatesByCountry = async (countryIso2) => {
  let headers = new Headers();
  headers.append("X-CSCAPI-KEY", import.meta.env.VITE_CSC_APIKEY);

  let requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${countryIso2}/states`,
      requestOptions,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

export const fetchCitiesByStateAndCountry = async (countryIso2, stateIso2) => {
  let headers = new Headers();
  headers.append("X-CSCAPI-KEY", import.meta.env.VITE_CSC_APIKEY);

  let requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${countryIso2}/states/${stateIso2}/cities`,
      requestOptions,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

export const fetchCitiesByCountry = async (countryIso2) => {
  let headers = new Headers();
  headers.append("X-CSCAPI-KEY", import.meta.env.VITE_CSC_APIKEY);

  let requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${countryIso2}/cities`,
      requestOptions,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};
