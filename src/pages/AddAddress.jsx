import Thumbnail from "../assets/rh_01.jpg";
import { AddressForm } from "../components/AddressForm";

export function AddAddress() {
  return (
    <section className="m-auto flex w-full max-w-screen-xl items-center justify-between p-8">
      <div className="flex w-full gap-4">
        <AddressForm method="create" />
        <figure className="hidden flex-1 sm:block">
          <img src={Thumbnail} alt="futuristic illustration of a city" />
        </figure>
      </div>
    </section>
  );
}
