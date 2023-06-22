import React, { useCallback, useEffect, useReducer, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import Input from "../Input";
import SubmitButton from "../SubmitButton";
import { validateInput } from "../../utils/actions/formActions";
import { reducer } from "../../utils/reducers/formReducer";
import { signIn } from "../../utils/actions/authActions";
import colors from "../../Constant/colors";

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? "test@gmail.com" : "",
    password: isTestMode ? "123456" : "",
  },

  inputValidities: {
    email: isTestMode,
    password: isTestMode,
  },
  formIsValid: isTestMode,
};

const SignInForm = () => {
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

      const action = signIn(
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
        id={"email"}
        label={"Email"}
        iconName={"mail"}
        iconSize={24}
        iconPack={Feather}
        onInputChanged={inputChangedHandler}
        keyboardType="email-address"
        autoCapitalize="none"
        error={formState.inputValidities["email"]}
        value={formState.inputValues.email}
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
        value={formState.inputValues.password}
      />

      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={colors.primaryColor}
          style={{ marginTop: 20 }}
        />
      ) : (
        <SubmitButton
          title={"Sign In"}
          onPress={authHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
