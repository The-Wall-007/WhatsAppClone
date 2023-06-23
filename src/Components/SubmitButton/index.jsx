import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import colors from "../../Constant/colors";

const SubmitButton = (props) => {
  const enabledBgColor = props.color || colors.primaryColor;
  const disabledBgColor = colors.lightGrey;
  const bgColor = props.disabled ? disabledBgColor : enabledBgColor;

  return (
    <TouchableOpacity
      style={{ ...styles.container, ...props.style, backgroundColor: bgColor }}
      onPress={props.disabled ? () => {} : props.onPress}
    >
      <Text style={{ color: props.disabled ? colors.grey : "white" }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: "100%",
  },
});
