import React from "react";
import { Text, View, StyleSheet } from "react-native";

import ProfileImage from "../ProfileImage";
import colors from "../../Constant/colors";

const ChatList = ({ userData }) => {
  return (
    <View style={styles.container}>
      <View>
        <ProfileImage
          uri={userData.profilePicture}
          size={40}
          showEditButton={false}
        />
      </View>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {userData.firstName}
        </Text>
        <Text numberOfLines={1} style={styles.subTitle}>
          {userData.about}
        </Text>
      </View>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomColor: colors.extraGrey,
    borderBottomWidth: 1,
    alignItems: "center",
    maxHeight: 50,
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontFamily: "medium",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  subTitle: {
    fontFamily: "regular",
    fontSize: 12,
    letterSpacing: 0.3,
    color: colors.grey,
  },
});
