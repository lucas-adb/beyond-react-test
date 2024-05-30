import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function AddressCard({ address }) {
  if (address.planet === "Mars") {
    return (
      <div className="rounded bg-slate-100 p-4">
        <h2 className="text-lg font-bold">{address.addressName}</h2>
        <p>{address.fullName}</p>
        <p>{address.addressLine1}</p>
        <p>{address.location}</p>
        <Link to={`/add/${address.id}`}>Edit Address</Link>
        <Link to={`/remove/${address.id}`}>Remove Address</Link>
      </div>
    );
  }

  if (address.planet === "Earth") {
    return (
      <div className="rounded bg-slate-100 p-4">
        <h2 className="text-lg font-bold">{address.addressName}</h2>
        <p>{address.fullName}</p>
        <p>{address.addressLine1}</p>
        <p>
          {address.city}, {address.state} {address.zipCode}
        </p>
        <Link to={`/add/${address.id}`}>Edit Address</Link>
        <Link to={`/remove/${address.id}`}>Remove Address</Link>
      </div>
    );
  }
}

AddressCard.propTypes = {
  address: PropTypes.shape({
    id: PropTypes.string.isRequired,
    addressName: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    addressLine1: PropTypes.string.isRequired,
    addressLine2: PropTypes.string,
    planet: PropTypes.string.isRequired,
    country: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};
