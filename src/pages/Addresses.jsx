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

  if (addresses.length < 1) {
    return (
      <section className="m-auto flex w-full max-w-screen-xl items-center justify-between p-8">
        <div className="flex w-full gap-4">
          <div className="flex flex-1 flex-col gap-4">
            <Link to="/add" className="rounded bg-blue-400 p-4">
              + Add Address
            </Link>
            <h1 className="text-lg font-bold">My Addresses</h1>
            <p className="animate-pulse">Loading. Please wait...</p>
          </div>
          <figure className="hidden flex-1 sm:block">
            <img src={Thumbnail} alt="" />
          </figure>
        </div>
      </section>
    );
  }

  return (
    <section className="m-auto flex w-full max-w-screen-xl items-center justify-between p-8">
      <div className="flex w-full gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <Link to="/add" className="rounded-lg border-2 border-green-500 p-4 font-bold text-green-500 hover:bg-green-500 hover:text-white">
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
