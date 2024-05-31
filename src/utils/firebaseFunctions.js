import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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

export async function updateIsDefault(id, newIsDefault) {
  const addressRef = doc(db, "addresses", id);

  try {
    await updateDoc(addressRef, {
      isDefault: newIsDefault,
    });

    if (newIsDefault) {
      const q = query(
        collection(db, "addresses"),
        where("isDefault", "==", true),
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.id !== id) {
          updateDoc(doc.ref, {
            isDefault: false,
          });
        }
      });
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}


export async function addAddress(address) {
  try {
    const addressesCollection = collection(db, "addresses");
    await addDoc(addressesCollection, {...address, isDefault: false});
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}