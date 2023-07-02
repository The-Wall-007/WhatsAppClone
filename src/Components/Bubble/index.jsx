import React from "react";
import { View, StyleSheet, Text } from "react-native";

import colors from "../../Constant/colors";

const Bubble = (props) => {
  const { text, type } = props;

  const bubbleStyle = { ...styles.container };
  const textStyle = { ...styles.text };

  switch (type) {
    case "system":
      textStyle.color = "#656448";
      bubbleStyle.backgroundColor = colors.beige;
      bubbleStyle.alignItems = "center";
      bubbleStyle.marginTop = 10;
      break;
    case "error":
      textStyle.color = "white";
      bubbleStyle.backgroundColor = colors.red;
      bubbleStyle.alignItems = "center";
      break;

    default:
      break;
  }

  return (
    <View style={styles.wrapperStyle}>
      <View style={bubbleStyle}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </View>
  );
};

export default Bubble;

const styles = StyleSheet.create({
  wrapperStyle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 5,
    marginBottom: 10,
    borderColor: "#E2DACC",
    borderWidth: 1,
  },
  text: {
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
});
