import React, { useCallback, useEffect, useReducer, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import Input from "../Input";
import SubmitButton from "../SubmitButton";
import { validateInput } from "../../utils/actions/formActions";
import { reducer } from "../../utils/reducers/formReducer";
import { signUp } from "../../utils/actions/authActions";
import colors from "../../Constant/colors";

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
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert("Error occured!", error);
    }
  }, [error]);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    try {
      setLoading(true);

      const action = signUp(
        formState.inputValues.firstName,
        formState.inputValues.lastName,
        formState.inputValues.email,
        formState.inputValues.password
      );

      setError(null);
      await dispatch(action);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
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

      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={colors.primaryColor}
          style={{ marginTop: 20 }}
        />
      ) : (
        <SubmitButton
          title={"Sign Up"}
          onPress={authHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
