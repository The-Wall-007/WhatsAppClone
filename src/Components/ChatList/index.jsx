import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import ProfileImage from "../ProfileImage";
import colors from "../../Constant/colors";

const ChatList = ({ profilePicture, title, subTitle, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View>
          <ProfileImage uri={profilePicture} size={40} showEditButton={false} />
        </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.subTitle}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
