import { useEffect, useState } from "react";
import Thumbnail from "../assets/thumbnail-2.jpg";
import {
  fetchCitiesByStateAndCountry,
  fetchCountries,
  fetchStatesByCountry,
} from "../utils/countries-states-cities";

export function AddAddress() {
  const [planet, setPlanet] = useState("Earth");
  const [country, setCountry] = useState("BR");
  const [state, setState] = useState("GO");
  const [city, setCity] = useState("Goiânia");

  const [countryNames, setCountryNames] = useState([]);
  const [stateNames, setStateNames] = useState([]);
  const [cityNames, setCityNames] = useState([]);

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
    }
  )}, [country, state])

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const address = Object.fromEntries(form.entries());
    console.log(address);
    console.log("oi");
  }

  return (
    <section className="m-auto flex w-full max-w-screen-xl items-center justify-between p-8">
      <div className="flex w-full gap-4">
        <form className="flex flex-1 flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="addressName">Address Name</label>
          <input
            type="text"
            id="addressName"
            className="rounded border border-slate-300 p-2"
          />
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            className="rounded border border-slate-300 p-2"
          />
          <label htmlFor="fullName">Phone Number</label>
          <input
            type="tel"
            id="phone"
            className="rounded border border-slate-300 p-2"
          />
          <label htmlFor="addressLine">Address Line</label>
          <input
            type="addressLine"
            id="text"
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
                    <option value={city.iso2} key={city.id}>
                      {city.name}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                className="rounded border border-slate-300 p-2"
              />
            </>
          )}

          {planet === "Mars" && (
            <>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                className="rounded border border-slate-300 p-2"
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
