import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const ChatListScreen = (props) => {
  const userData = useSelector((state) => state.auth.userData);

  return (
    <View style={styles.container}>
      <Text>Chat List Screen {userData.firstName}</Text>
      <Button
        title="Go to Chat"
        onPress={() => props.navigation.navigate("ChatScreen")}
      />
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
