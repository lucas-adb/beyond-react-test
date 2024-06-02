import { useParams } from "react-router-dom";
import Thumbnail from "../assets/rh_01.jpg";
import { useEffect, useState } from "react";
import { getAddressById } from "../utils/firebaseFunctions";
import { AddressForm } from "../components/AddressForm";

export function EditAddress() {
  const { id } = useParams();
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAddressById(id).then((address) => {
      setAddress(address);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <section className="m-auto flex w-full max-w-screen-xl items-center justify-between p-8">
        <div className="flex w-full gap-4">
          <div className="flex-1">
            <p className="animate-pulse text-lg font-bold">
              Loading. Please wait...
            </p>
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
        {address?.addressName === undefined && (
          <div className="flex-1">
            <p className="text-lg font-bold">No address found</p>
          </div>
        )}

        {address?.addressName && (
          <AddressForm method={"post"} id={id} oldAddress={address} />
        )}

        <figure className="hidden flex-1 sm:block">
          <img src={Thumbnail} alt="futuristic illustration of a city" />
        </figure>
      </div>
    </section>
  );
}
