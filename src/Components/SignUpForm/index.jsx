import React, { useCallback, useReducer } from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import Input from "../Input";
import SubmitButton from "../SubmitButton";
import { validateInput } from "../../utils/actions/formActions";
import { reducer } from "../../utils/reducers/formReducer";
import { signUp } from "../../utils/actions/authActions";

const initialState = {
  inputValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },

  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignUpForm = () => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const authHandler = () => {
    console.log(
      formState.inputValues.firstName,
      formState.inputValues.lastName,
      formState.inputValues.email,
      formState.inputValues.password
    );
  };

  return (
    <>
      <Input
        id={"firstName"}
        label={"First Name"}
        iconName={"user"}
        iconSize={24}
        iconPack={Feather}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none"
        error={formState.inputValidities["firstName"]}
      />
      <Input
        id={"lastName"}
        label={"Last Name"}
        iconName={"user"}
        iconSize={24}
        iconPack={Feather}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none"
        error={formState.inputValidities["lastName"]}
      />
      <Input
        id={"email"}
        label={"Email"}
        iconName={"mail"}
        iconSize={24}
        iconPack={Feather}
        onInputChanged={inputChangedHandler}
        keyboardType="email-address"
        autoCapitalize="none"
        error={formState.inputValidities["email"]}
      />
      <Input
        id={"password"}
        label={"Password"}
        iconName={"lock"}
        iconSize={24}
        iconPack={Feather}
        secureTextEntry
        autoCapitalize="none"
        onInputChanged={inputChangedHandler}
        error={formState.inputValidities["password"]}
      />

      <SubmitButton
        title={"Sign Up"}
        onPress={authHandler}
        style={{ marginTop: 20 }}
        disabled={!formState.formIsValid}
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
