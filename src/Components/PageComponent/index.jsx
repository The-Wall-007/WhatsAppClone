import React from "react";
import { View, StyleSheet } from "react-native";

const PageComponent = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

export default PageComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});
