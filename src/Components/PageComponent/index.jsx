import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../Constant/colors";

const PageComponent = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

export default PageComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
});
