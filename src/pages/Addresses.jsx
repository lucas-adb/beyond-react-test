import { Link } from "react-router-dom";

export function Addresses() {
  return (
    <section>
      <h1>My Addresses</h1>
      <Link to="/add">Add Address</Link>
      <Link to="/edit">Edit Address</Link>
    </section>
  );
}
