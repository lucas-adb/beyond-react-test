import { useEffect, useState } from "react";
import Thumbnail from "../assets/thumbnail-2.jpg";
import {
  fetchCitiesByStateAndCountry,
  fetchCountries,
  fetchStatesByCountry,
} from "../utils/countries-states-cities";
import { isFormValid } from "../validations/formValidation";

export function AddAddress() {
  // General
  const [addressName, setAddressName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");

  // Earth
  const [planet, setPlanet] = useState("Earth");
  const [country, setCountry] = useState("BR");
  const [state, setState] = useState("GO");
  const [city, setCity] = useState("Goiânia");
  const [zipCode, setZipCode] = useState("");

  // Mars
  const [location, setLocation] = useState("");

  const [countryNames, setCountryNames] = useState([]);
  const [stateNames, setStateNames] = useState([]);
  const [cityNames, setCityNames] = useState([]);

  // Error
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCountries().then((data) => {
      setCountryNames(data);
    });
  }, []);

  useEffect(() => {
    fetchStatesByCountry(country).then((data) => {
      setStateNames(data);
    });
  }, [country]);

  useEffect(() => {
    fetchCitiesByStateAndCountry(country, state).then((data) => {
      setCityNames(data);
    });
  }, [country, state]);

  function handleSubmit(event) {
    event.preventDefault();
    // const form = new FormData(event.target);
    // const address = Object.fromEntries(form.entries());
    // console.log(address);
    // console.log("oi");

    let form = {
      addressName,
      fullName,
      phone,
      addressLine,
      planet,
      ...(planet === "Earth" ? { country, state, city, zipCode } : {}),
      ...(planet === "Mars" ? { location } : {}),
    };

    const validation = isFormValid(form);
    if (validation) {
      setError(validation);
      return;
    }

    setError("");
    console.log(validation);
  }

  return (
    <section className="m-auto flex w-full max-w-screen-xl items-center justify-between p-8">
      <div className="flex w-full gap-4">
        <form className="flex flex-1 flex-col gap-4" onSubmit={handleSubmit}>
          {error && <p>Error: {error}</p>}

          <label htmlFor="addressName">Address Name</label>
          <input
            type="text"
            id="addressName"
            value={addressName}
            placeholder="Home, Work, etc."
            onChange={(event) => setAddressName(event.target.value)}
            className="rounded border border-slate-300 p-2"
          />
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            placeholder="Receiver's name"
            onChange={(event) => setFullName(event.target.value)}
            className="rounded border border-slate-300 p-2"
          />
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            placeholder="+5562999999999"
            onChange={(event) => setPhone(event.target.value)}
            className="rounded border border-slate-300 p-2"
          />
          <label htmlFor="addressLine">Address Line</label>
          <input
            type="text"
            id="addressLine"
            value={addressLine}
            placeholder="Street, number, neighborhood, etc."
            onChange={(event) => setAddressLine(event.target.value)}
            className="rounded border border-slate-300 p-2"
          />
          <p>Planet</p>
          <div className="flex gap-4 py-2">
            <input
              type="radio"
              name="planet"
              id="planet-earth"
              value="Earth"
              checked={planet === "Earth"}
              onChange={(event) => setPlanet(event.target.value)}
            />
            <label htmlFor="planet-earth">Earth</label>
            <input
              type="radio"
              name="planet"
              id="planet-mars"
              value="Mars"
              checked={planet === "Mars"}
              onChange={(event) => setPlanet(event.target.value)}
            />
            <label htmlFor="planet-mars">Mars</label>
          </div>

          {planet === "Earth" && (
            <>
              <label htmlFor="country">Country</label>
              <select
                required
                id="country"
                value={country}
                name="country"
                className="min-h-11 rounded border border-slate-300 bg-white p-2"
                onChange={(event) => {
                  setCountry(event.target.value);
                }}
              >
                {countryNames?.map((country) => {
                  return (
                    <option value={country.iso2} key={country.id}>
                      {country.name}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="state">State</label>
              <select
                required
                id="state"
                value={state}
                name="state"
                className="min-h-11 rounded border border-slate-300 bg-white p-2"
                onChange={(event) => {
                  setState(event.target.value);
                }}
              >
                {stateNames?.map((state) => {
                  return (
                    <option value={state.iso2} key={state.id}>
                      {state.name}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="city">City</label>
              <select
                required
                id="city"
                value={city}
                name="city"
                className="min-h-11 rounded border border-slate-300 bg-white p-2"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              >
                {cityNames?.map((city) => {
                  return (
                    <option value={city.name} key={city.id}>
                      {city.name}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                value={zipCode}
                className="rounded border border-slate-300 p-2"
                onChange={(event) => setZipCode(event.target.value)}
              />
            </>
          )}

          {planet === "Mars" && (
            <>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                className="rounded border border-slate-300 p-2"
                onChange={(event) => setLocation(event.target.value)}
              />
            </>
          )}

          <button type="submit" className="rounded bg-slate-200 p-4">
            Add Address
          </button>
        </form>
        <figure className="hidden flex-1 sm:block">
          <img src={Thumbnail} alt="" />
        </figure>
      </div>
    </section>
  );
}
