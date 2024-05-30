import { Link } from "react-router-dom";

export function Addresses() {
  return (
    <section className="m-auto flex w-full max-w-screen-xl items-center justify-between p-8">
      <h1>My Addresses</h1>
      <nav className="flex gap-4">
        <Link to="/add">Add Address</Link>
        <Link to="/edit">Edit Address</Link>
      </nav>
    </section>
  );
}
