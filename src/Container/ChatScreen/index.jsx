import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";

import backGroundImage from "../../assets/images/droplet.jpeg";
import colors from "../../Constant/colors";
import { PageComponent } from "../../Components";
import Bubble from "../../Components/Bubble";
import { createChat } from "../../utils/actions/chatActions";

const ChatScreen = (props) => {
  const userData = useSelector((state) => state.auth.userData);
  const storedUsers = useSelector((state) => state.users.storedUsers);
  const storedChats = useSelector((state) => state.chats.chatsData);

  console.log(storedChats);

  const [message, setMessage] = useState("");
  const [chatUsers, setChatUsers] = useState([]);
  const [chatId, setChatId] = useState(props.route?.params?.chatId);

  const chatData =
    (chatId && storedChats[chatId]) || props.route?.params?.newChatData;

  const getChatTitleFromName = () => {
    const otherUserId = chatUsers.find((uid) => uid !== userData.userId);
    const otherUserData = storedUsers[otherUserId];

    return (
      otherUserData && `${otherUserData.firstName} ${otherUserData.lastName}`
    );
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: getChatTitleFromName(),
    });

    setChatUsers(chatData.users);
  }, [chatUsers]);

  const sendMessage = useCallback(async () => {
    try {
      let id = chatId;
      if (!id) {
        //No chat id. Create the chat
        id = await createChat(userData.userId, props.route.params.newChatData);
        setChatId(id);
      }
    } catch (error) {}

    setMessage("");
  }, [message, chatId]);

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.screen}
        keyboardVerticalOffset={100}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ImageBackground
          source={backGroundImage}
          style={styles.imageBackGround}
        >
          <PageComponent style={{ backgroundColor: "transparent" }}>
            {!chatId && (
              <Bubble text={"This is a new chat. Say hi!!"} type={"system"} />
            )}
          </PageComponent>
        </ImageBackground>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.mediaButton}>
            <Feather name="plus" size={24} color={colors.blue} />
          </TouchableOpacity>

          <TextInput
            style={styles.txtInput}
            onChangeText={setMessage}
            value={message}
            onSubmitEditing={sendMessage}
          />

          {message === "" ? (
            <TouchableOpacity style={styles.mediaButton}>
              <Feather name="camera" size={24} color={colors.blue} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.mediaButton, styles.sendButton]}
              onPress={sendMessage}
            >
              <Feather name="send" size={20} color={"#ffffff"} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  screen: {
    flex: 1,
  },
  imageBackGround: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  txtInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.lightGray,
    marginHorizontal: 15,
    paddingHorizontal: 15,
  },
  mediaButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
  },
  sendButton: {
    backgroundColor: colors.blue,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
