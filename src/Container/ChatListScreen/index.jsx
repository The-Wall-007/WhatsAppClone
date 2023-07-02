import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import {
  ChatList,
  CustomeHeaderButton,
  PageComponent,
  PageTitle,
} from "../../Components";

const ChatListScreen = (props) => {
  const selectedUserId = props.route?.params?.selectedUserId;

  const userData = useSelector((state) => state.auth.userData);
  const storedUsers = useSelector((state) => state.users.storedUsers);
  const userChats = useSelector((state) => {
    const chatsData = state.chats.chatsData;
    return Object.values(chatsData).sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  });

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

  useEffect(() => {
    if (!selectedUserId) {
      return;
    }

    const chatUsers = [selectedUserId, userData.userId];

    const navigationProps = {
      newChatData: { users: chatUsers },
    };

    props.navigation.navigate("ChatScreen", navigationProps);
  }, [props.route?.params]);

  return (
    <PageComponent>
      <PageTitle title={"Chats"} />

      <FlatList
        data={userChats}
        renderItem={(itemData) => {
          const chatData = itemData.item;
          const chatId = chatData.key;
          const otherUserId = chatData.users.find(
            (uid) => uid !== userData.userId
          );

          const otherUser = storedUsers[otherUserId];

          if (!otherUser) return;

          const title = `${otherUser.firstName} ${otherUser.lastName}`;
          const subTitle = chatData.lastMessageText || "New chat";
          return (
            <ChatList
              title={title}
              profilePicture={otherUser.profilePicture}
              subTitle={subTitle}
              onPress={() =>
                props.navigation.navigate("ChatScreen", { chatId })
              }
            />
          );
        }}
      />
    </PageComponent>
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
