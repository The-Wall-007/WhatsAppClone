import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import { CustomeHeaderButton } from "../../Components";

const ChatListScreen = (props) => {
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomeHeaderButton}>
            <Item
              title="New Chat"
              iconName="create-outline"
              onPress={() => props.navigation.navigate("NewChatScreen")}
            />
          </HeaderButtons>
        );
      },
    });
  }, []);

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
