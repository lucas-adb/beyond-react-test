import { Link } from "react-router-dom";
import Thumbnail from "../assets/thumbnail.jpg";

const mockAddresses = [
  {
    id: "01",
    addressName: "Bates Motel",
    fullName: "Norman Bates",
    addressLine1: "1234 Psycho Lane",
    addressLine2: "",
    planet: "Earth",
    country: "USA",
    city: "Fairvale",
    state: "CA",
    zipCode: "12345",
  },
  {
    id: "02",
    addressName: "Mars Base Alpha",
    fullName: "John Doe",
    planet: "Mars",
    addressLine1: "1234 Red Planet Road",
    location: "1234"
  }
]

export function Addresses() {
  return (
    <section className="m-auto flex w-full max-w-screen-xl items-center justify-between p-8">
      <div className="flex">
        <div className="flex-1 flex flex-col mr-8 gap-4">
          <Link to="/add" className="p-4 bg-slate-200 rounded">+ Add Address</Link>
          <h1 className="text-lg font-bold">My Addresses</h1>
          <nav className="flex gap-4">
            <Link to="/edit">Edit Address</Link>
          </nav>
        </div>
        <figure className="basis-1/2 hidden sm:flex">
          <img src={Thumbnail} alt="" />
        </figure>
      </div>
    </section>
  );
}
