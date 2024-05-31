import { Link } from "react-router-dom";
import { AddressCard } from "../components/AddressCard";
import Thumbnail from "../assets/thumbnail-2.jpg";
import { useEffect, useState } from "react";
import { getAddresses } from "../utils/firebaseFunctions";

export function Addresses() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const unsubscribe = getAddresses(setAddresses);
    return () => unsubscribe();

  }, []);

  return (
    <section className="m-auto flex w-full max-w-screen-xl items-center justify-between p-8">
      <div className="flex w-full gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <Link to="/add" className="rounded bg-slate-100 p-4">
            + Add Address
          </Link>
          <h1 className="text-lg font-bold">My Addresses</h1>
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
        <figure className="hidden flex-1 sm:block">
          <img src={Thumbnail} alt="" />
        </figure>
      </div>
    </section>
  );
}
