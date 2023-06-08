import React, { useState, useCallback } from "react";
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
import { Feather } from "@expo/vector-icons";

import backGroundImage from "../../assets/images/droplet.jpeg";
import colors from "../../Constant/colors";

const ChatScreen = () => {
  const [message, setMessage] = useState("");

  const sendMessage = useCallback(() => {
    setMessage("");
  }, [message]);

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
        ></ImageBackground>

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
