import { useState } from "react";
import Thumbnail from "../assets/thumbnail-2.jpg";
import { COUNTRIES } from "../utils/isoCountries";

export function AddAddresses() {
  const [planet, setPlanet] = useState("Earth");
  const [country, setCountry] = useState("US");

  const countryNames = Object.entries(COUNTRIES);

  return (
    <section className="m-auto flex w-full max-w-screen-xl items-center justify-between p-8">
      <div className="flex w-full gap-4">
        <form className="flex flex-1 flex-col gap-4">
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
                className="rounded border border-slate-300 bg-white p-2 min-h-11"
                onChange={(event) => {
                  setCountry(event.target.value);
                }}
              >
                {countryNames.map(([id, label]) => {
                  return (
                    <option value={id} key={id}>
                      {label}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                className="rounded border border-slate-300 p-2"
              />
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                className="rounded border border-slate-300 p-2"
              />
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

          <button type="submit" className="bg-slate-200 rounded p-4">Add Address</button>
        </form>
        <figure className="hidden flex-1 sm:block">
          <img src={Thumbnail} alt="" />
        </figure>
      </div>
    </section>
  );
}
