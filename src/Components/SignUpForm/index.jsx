import React from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Input, SubmitButton } from "..";

const SignUpForm = () => {
  return (
    <>
      <Input
        label={"First Name"}
        iconName={"user"}
        iconSize={24}
        iconPack={Feather}
      />
      <Input
        label={"Last Name"}
        iconName={"user"}
        iconSize={24}
        iconPack={Feather}
      />
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
        title={"Sign Up"}
        onPress={() => console.log("Pressed")}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
