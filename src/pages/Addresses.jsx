import { Link } from "react-router-dom";
import { AddressCard } from "../components/AddressCard";
import { mockAddresses } from "../data/mockAddresses";
import Thumbnail from "../assets/thumbnail.jpg";

export function Addresses() {
  return (
    <section className="m-auto flex w-full max-w-screen-xl items-center justify-between p-8">
      <div className="flex flex-col-reverse gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <Link to="/add" className="rounded bg-slate-100 p-4">
            + Add Address
          </Link>
          <h1 className="text-lg font-bold">My Addresses</h1>
          {mockAddresses.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
        <figure className="basis-1/2">
          <img src={Thumbnail} alt="" />
        </figure>
      </div>
    </section>
  );
}
