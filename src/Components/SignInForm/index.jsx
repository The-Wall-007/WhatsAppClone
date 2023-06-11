import React from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import Input from "../Input";
import SubmitButton from "../SubmitButton";

const SignInForm = () => {
  return (
    <>
      <Input
        label={"Email"}
        iconName={"mail"}
        iconSize={24}
        iconPack={Feather}
      />
      <Input
        label={"Password"}
        iconName={"lock"}
        iconSize={24}
        iconPack={Feather}
      />

      <SubmitButton
        title={"Sign In"}
        onPress={() => console.log("Pressed")}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
