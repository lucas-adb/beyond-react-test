import { useEffect, useState } from "react";
import {
  fetchCitiesByStateAndCountry,
  fetchCountries,
  fetchStatesByCountry,
} from "../utils/countries-states-cities";
import { validateFormFields } from "../validations/formValidation";
import { addAddress, updatedAddresses } from "../utils/firebaseFunctions";

import PropTypes from "prop-types";

const initialState = {
  addressName: "",
  fullName: "",
  phone: "",
  addressLine: "",
  planet: "Earth",
  country: "BR",
  state: "GO",
  city: "Goiânia",
  zipCode: "",
  location: "",
};

export function AddressForm({
  method = "create",
  id,
  oldAddress = initialState,
}) {
  const addressWithDefaultEarthValues =
    oldAddress.planet === "Earth"
      ? oldAddress
      : { ...oldAddress, country: "BR", state: "GO", city: "Goiânia" };

  const [formState, setFormState] = useState(addressWithDefaultEarthValues);
  const [countryNames, setCountryNames] = useState([]);
  const [stateNames, setStateNames] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  const [error, setError] = useState("");

  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountriesData = async () => {
      const data = await fetchCountries();
      setCountryNames(data);
    };
    fetchCountriesData();
  }, []);

  useEffect(() => {
    const fetchStatesData = async () => {
      setStateNames([]);
      const data = await fetchStatesByCountry(formState.country);

      setStateNames([...data]);
      // setFormState((prevState) => ({ ...prevState, state: data[0].iso2 }));
      setFormState((prevState) => ({ ...prevState, state: "" }));
    };
    fetchStatesData();
  }, [formState.country]);

  useEffect(() => {
    const fetchCitiesData = async () => {
      setCityNames([]);

      const data = await fetchCitiesByStateAndCountry(
        formState.country,
        formState.state,
      );

      // console.log(data);

      setCityNames(data);
      // setFormState((prevState) => ({ ...prevState, city: data[0].name }));
      setFormState((prevState) => ({ ...prevState, city: "" }));
    };

    if (formState.state.length > 0) {
      fetchCitiesData();
    }
    
    // fetchCitiesData();
  }, [formState.country, formState.state]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let form = {
      addressName: formState.addressName,
      fullName: formState.fullName,
      phone: formState.phone,
      addressLine: formState.addressLine,
      planet: formState.planet,
      ...(formState.planet === "Earth"
        ? {
            country: formState.country,
            state: formState.state,
            city: formState.city,
            zipCode: formState.zipCode,
          }
        : {}),
      ...(formState.planet === "Mars" ? { location: formState.location } : {}),
    };

    const validation = validateFormFields(form);
    if (validation) {
      setError(validation);
      return;
    }

    // console.log("Form submitted", form);

    if (method === "create") {
      addAddress(form);
    }

    if (method === "post") {
      updatedAddresses(id, form);
    }

    setError("");
    setFormState(initialState);
  };

  return (
    <form className="flex flex-1 flex-col gap-4" onSubmit={handleSubmit}>
      {error && <p>Error: {error}</p>}

      <label htmlFor="addressName">Address Name</label>
      <input
        type="text"
        id="addressName"
        name="addressName"
        value={formState.addressName}
        placeholder="Home, Work, etc."
        onChange={handleChange}
        className="rounded border border-slate-300 p-2"
      />
      <label htmlFor="fullName">Full Name</label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        value={formState.fullName}
        placeholder="Receiver's name"
        onChange={handleChange}
        className="rounded border border-slate-300 p-2"
      />
      <label htmlFor="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formState.phone}
        placeholder="+5562999999999"
        onChange={handleChange}
        className="rounded border border-slate-300 p-2"
      />
      <label htmlFor="addressLine">Address Line</label>
      <input
        type="text"
        id="addressLine"
        name="addressLine"
        value={formState.addressLine}
        placeholder="Street, number, neighborhood, etc."
        onChange={handleChange}
        className="rounded border border-slate-300 p-2"
      />
      <p>Planet</p>
      <div className="flex gap-4 py-2">
        <input
          type="radio"
          name="planet"
          id="planet-earth"
          value="Earth"
          checked={formState.planet === "Earth"}
          onChange={handleChange}
          className="accent-green-500"
        />
        <label htmlFor="planet-earth">Earth</label>
        <input
          type="radio"
          name="planet"
          id="planet-mars"
          value="Mars"
          checked={formState.planet === "Mars"}
          onChange={handleChange}
          className="accent-green-500"
        />
        <label htmlFor="planet-mars">Mars</label>
      </div>

      {formState.planet === "Earth" && (
        <>
          <label htmlFor="country">Country</label>
          <select
            required
            id="country"
            value={formState.country}
            name="country"
            className="min-h-11 rounded border border-slate-300 bg-white p-2"
            onChange={handleChange}
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
            value={formState.state}
            name="state"
            className="min-h-11 rounded border border-slate-300 bg-white p-2"
            onChange={handleChange}
          >
            <option value={""}>Select a state</option>
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
            value={formState.city}
            name="city"
            className="min-h-11 rounded border border-slate-300 bg-white p-2"
            onChange={handleChange}
          >
            <option value={""}>Select a city</option>
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
            name="zipCode"
            value={formState.zipCode}
            className="rounded border border-slate-300 p-2"
            onChange={handleChange}
          />
        </>
      )}

      {formState.planet === "Mars" && (
        <>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formState.location}
            className="rounded border border-slate-300 p-2"
            onChange={handleChange}
          />
        </>
      )}

      <button
        type="submit"
        className="rounded bg-green-500 p-4 font-bold hover:bg-green-600"
      >
        {method === "create" ? "Add Address" : "Edit Address"}
      </button>
    </form>
  );
}

AddressForm.propTypes = {
  method: PropTypes.string,
  id: PropTypes.string,
  oldAddress: PropTypes.shape({
    addressName: PropTypes.string,
    fullName: PropTypes.string,
    phone: PropTypes.string,
    addressLine: PropTypes.string,
    planet: PropTypes.string,
    country: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    zipCode: PropTypes.string,
    location: PropTypes.string,
  }),
};

// {loading ? (
//   <p>Loading cities...</p>
// ) : (
//   <select
//     required
//     id="city"
//     value={formState.city}
//     name="city"
//     className="min-h-11 rounded border border-slate-300 bg-white p-2"
//     onChange={handleChange}
//   >
//     {cityNames?.map((city) => {
//       return (
//         <option value={city.name} key={city.id}>
//           {city.name}
//         </option>
//       );
//     })}
//   </select>
// )}

// useEffect(() => {
//   const fetchStatesData = async () => {
//     const data = await fetchStatesByCountry(formState.country);
//     setStateNames(data);
//   };
//   fetchStatesData();
// }, [formState.country]);

// useEffect(() => {
//   const fetchCitiesData = async () => {
//     const data = await fetchCitiesByStateAndCountry(
//       formState.country,
//       formState.state,
//     );
//     setCityNames(data);
//   };
//   fetchCitiesData();
// }, [formState.country, formState.state]);

// useEffect(() => {
//   const fetchCitiesData = async () => {
//     setLoading(true);
//     const data = await fetchCitiesByStateAndCountry(
//       formState.country,
//       formState.state,
//     );
//     console.log(data);
//     setCityNames(data);
//     setLoading(false);
//   };
//   fetchCitiesData();
// }, [formState.country, formState.state]);

// const handleCountryChange = (event) => {
//   const { value } = event.target;
//   setFormState({ ...formState, country: value, state: stateNames[0], city: cityNames[0] });
// };

// const handleStateChange = (event) => {
//   const { value } = event.target;
//   setFormState({ ...formState, state: value, city: cityNames[0] });
// };
