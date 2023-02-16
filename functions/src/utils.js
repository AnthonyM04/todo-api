import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import service_account from "./service_account.json" assert { type: "json" };

export async function getFirestoreInstance() {
  // check if app has already been initialized
  try {
    const isInitialized = getApps().length > 0;
    if (!isInitialized) { // not initialized, connect to firebase
      initializeApp({
        credential: cert(service_account),
      });
    }
    return getFirestore();
  }
  catch (error) {
    console.error(error);
  }
}