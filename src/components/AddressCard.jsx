import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { removeAddress, updateIsDefault } from "../utils/firebaseFunctions";

export function AddressCard({ address }) {
  const cardWrapperStyle =
    address.isDefault === "true"
      ? "rounded bg-slate-100 p-4 border border-slate-900"
      : "rounded bg-slate-100 p-4";

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
      return (
        <>
          <p>{address.fullName}</p>
          <p>{address.addressLine}</p>
          <p>
            {address.city}, {address.state} {address.zipCode}
          </p>
        </>
      );
    }
  };

  return (
    <div className={`${cardWrapperStyle}`}>
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">{address.addressName}</h2>
        <input
          type="checkbox"
          className="rounded border border-slate-900 p-2"
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
          className="rounded border border-slate-900 p-2"
        >
          Edit Address
        </Link>

        <button onClick={() => removeAddress(address.id)} className="rounded border border-slate-900 p-2">
          Remove Address
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
