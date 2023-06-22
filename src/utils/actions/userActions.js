import { getFirebaseApp } from "../firebaseHelper";
import { child, get, getDatabase, ref } from "firebase/database";

export const getUserData = async (userId) => {
  try {
    const app = getFirebaseApp();
    const appRef = ref(getDatabase(app));
    const userRef = child(appRef, `users/${userId}`);

    const snapshort = await get(userRef);
    return snapshort.val();
  } catch (error) {
    console.log("Error from userActions:::::", error);
  }
};
