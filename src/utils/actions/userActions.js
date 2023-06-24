import { getFirebaseApp } from "../firebaseHelper";
import {
  child,
  endAt,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
  startAt,
} from "firebase/database";

export const getUserData = async (userId) => {
  try {
    const app = getFirebaseApp();
    const appRef = ref(getDatabase(app));
    const userRef = child(appRef, `users/${userId}`);

    const snapshort = await get(userRef);
    return snapshort.val();
  } catch (error) {
    console.log("Error from getUserData:::::", error);
  }
};

export const searchUser = async (queryText) => {
  const searchTerm = queryText.toLowerCase();

  try {
    const app = getFirebaseApp();
    const appRef = ref(getDatabase(app));
    const userRef = child(appRef, "users");

    const queryRef = query(
      userRef,
      orderByChild("firstLast"),
      startAt(searchTerm),
      endAt(searchTerm + "\uf8ff")
    );

    const snapshort = await get(queryRef);

    if (snapshort.exists()) {
      return snapshort.val();
    }

    return {};
  } catch (error) {
    console.log("Error from searchUser:::::", error);
  }
};
