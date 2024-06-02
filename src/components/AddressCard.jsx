import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { removeAddress, updateIsDefault } from "../utils/firebaseFunctions";

export function AddressCard({ address }) {
  const cardWrapperStyle =
    address.isDefault === true
      ? "rounded-lg border border-slate-200 p-4 shadow-md shadow-green-300"
      : "rounded-lg border border-slate-200 p-4 shadow";

  const AddressDescription = () => {
    if (address.planet === "Mars") {
      return (
        <>
          <p>{address.fullName}</p>
          <p>{address.addressLine}</p>
          <p>{address.location}</p>
        </>
      );
    }

    if (address.planet === "Earth") {
      if (address.state !== "" && address.city !== "") {
        return (
          <>
            <p>{address.fullName}</p>
            <p>{address.addressLine}</p>
            <p>
              {address.city}, {address.state}, {address.country}
            </p>
          </>
        );
      }

      return (
        <>
          <p>{address.fullName}</p>
          <p>{address.addressLine}</p>
          <p>{address.country}</p>
        </>
      );
    }
  };

  return (
    <div className={cardWrapperStyle}>
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">{address.addressName}</h2>
        <input
          type="checkbox"
          id="isDefaultCheckbox"
          className="h-4 w-4 cursor-pointer accent-green-500"
          checked={address.isDefault}
          onChange={() => {
            const newIsDefault = !address.isDefault;
            updateIsDefault(address.id, newIsDefault);
          }}
        />
      </div>

      <AddressDescription />

      <nav className="mt-2 flex gap-2">
        <Link
          to={`/edit/${address.id}`}
          className="rounded-full bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600"
        >
          Edit
        </Link>

        <button
          onClick={() => removeAddress(address.id)}
          className="rounded-full bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600"
        >
          Remove
        </button>
      </nav>
    </div>
  );
}

AddressCard.propTypes = {
  address: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isDefault: PropTypes.bool.isRequired,
    addressName: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    addressLine: PropTypes.string.isRequired,
    planet: PropTypes.string.isRequired,
    country: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};
