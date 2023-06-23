import * as ImagePicker from "expo-image-picker";
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { Platform } from "react-native";
import uuid from "react-native-uuid";

import { getFirebaseApp } from "./firebaseHelper";

export const launchImagePicker = async () => {
  await checkMediaPermission();

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
};

const checkMediaPermission = async () => {
  if (Platform.OS !== "web") {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      return new Promise.reject("We need permission to access photos");
    }

    return new Promise.resolve();
  }
};

export const uploadImageAsync = async (uri) => {
  const app = getFirebaseApp();

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };

    xhr.onerror = function (e) {
      console.log(e);
      // something went wrong
      reject(new TypeError("uriToBlob failed"));
    };
    // this helps us get a blob
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);

    xhr.send();
  });

  const pathFolder = "profilePics";
  const storageRef = ref(getStorage(app), `${pathFolder}/${uuid.v4()}`);

  await uploadBytesResumable(storageRef, blob);

  blob.close();

  return await getDownloadURL(storageRef);
};
