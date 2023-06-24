import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import profilePlaceHolder from "../../assets/images/userImage.jpeg";
import colors from "../../Constant/colors";
import {
  launchImagePicker,
  uploadImageAsync,
} from "../../utils/imagePickerHelper";
import { updateLoggedInUser } from "../../utils/actions/authActions";
import { updateLoggedInUserData } from "../../store/authSlice";

const ProfileImage = (props) => {
  const source = props.uri ? { uri: props.uri } : profilePlaceHolder;
  const userId = props.userId;
  const showEditButton = props.showEditButton && props.showEditButton === true;

  const Component = showEditButton ? TouchableOpacity : View;

  const dispatch = useDispatch();

  const [image, setImage] = useState(source);
  const [imageLoading, setImageLoading] = useState(false);

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker();

      if (!tempUri) return;

      //upload the image
      setImageLoading(true);
      const uploadUrl = await uploadImageAsync(tempUri);
      setImageLoading(false);

      if (!uploadUrl) {
        throw new Error("Could not upload image");
      }

      const newData = { profilePicture: uploadUrl };

      dispatch(updateLoggedInUserData({ newData }));

      await updateLoggedInUser(userId, newData);

      //setImage
      setImage({ uri: uploadUrl });
    } catch (error) {
      setImageLoading(false);
      console.log("Error in pickImage:::::", error);
    }
  };

  return (
    <Component onPress={pickImage}>
      {!imageLoading ? (
        <Image
          source={image}
          style={{
            ...styles.image,
            ...{
              borderRadius: props.size / 2,
              height: props.size,
              width: props.size,
            },
          }}
        />
      ) : (
        <View
          style={{
            ...styles.image,
            ...{
              borderRadius: props.size / 2,
              height: props.size,
              width: props.size,
              justifyContent: "center",
            },
          }}
        >
          <ActivityIndicator color={colors.primaryColor} size={"large"} />
        </View>
      )}

      {showEditButton && !imageLoading && (
        <View style={styles.iconStyle}>
          <FontAwesome name="pencil" size={16} color={colors.grey} />
        </View>
      )}
    </Component>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  image: {
    borderColor: colors.lightGrey,
    borderWidth: 1,
  },
  iconStyle: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: colors.nearlyWhite,
    padding: 8,
    borderRadius: 20,
  },
});
