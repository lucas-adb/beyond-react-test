import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export function getAddresses(setAddresses) {
  try {
    const addressesCollection = collection(db, "addresses");

    const unsubscribe = onSnapshot(addressesCollection, (snapshot) => {
      const updatedAddresses = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAddresses(updatedAddresses || []);
    });

    return () => unsubscribe();
  } catch (error) {
    console.error(error);
  }
}