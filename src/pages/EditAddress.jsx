import { useParams } from "react-router-dom";
import Thumbnail from "../assets/thumbnail-2.jpg";
import { useEffect, useState } from "react";
import { getAddressById } from "../utils/firebaseFunctions";
import { AddressForm } from "../components/AddressForm";

export function EditAddress() {
  const { id } = useParams();
  const [address, setAddress] = useState({});

  useEffect(() => {
    getAddressById(id).then((address) => {
      console.log(address);
      setAddress(address);
    });
  }, [id]);

  if (address?.addressName === undefined) {
    return (
      <section className="m-auto flex w-full max-w-screen-xl items-center justify-between p-8">
        <div className="flex w-full gap-4">
          <p>No address found...</p>
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
        <AddressForm defaultValues={address} />
        <figure className="hidden flex-1 sm:block">
          <img src={Thumbnail} alt="" />
        </figure>
      </div>
    </section>
  );
}
