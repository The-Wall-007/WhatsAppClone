import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

import colors from "../../Constant/colors";

const Input = (props) => {
  const [initialValue, setInitialValue] = useState(props.initialValue);

  const onChangeText = (text) => {
    setInitialValue(text);
    props.onInputChanged(props.id, text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>

      <View style={styles.inputContainer}>
        {props.iconName && (
          <props.iconPack
            name={props.iconName}
            size={props.iconSize || 15}
            style={styles.icon}
          />
        )}

        <TextInput
          {...props}
          style={styles.input}
          onChangeText={onChangeText}
          value={initialValue}
        />
      </View>

      {props.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.error[0]}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
    fontFamily: "bold",
    letterSpacing: 0.3,
    color: colors.textColor,
  },
  inputContainer: {
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.nearlyWhite,
  },
  icon: {
    marginRight: 10,
    color: "grey",
  },
  input: {
    flex: 1,
    color: colors.textColor,
    fontFamily: "regular",
    letterSpacing: 0.3,
    paddingTop: 0,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontFamily: "regular",
    fontSize: 13,
    letterSpacing: 0.3,
  },
});
