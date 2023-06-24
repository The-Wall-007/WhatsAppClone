import React, { useCallback, useReducer, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";

import {
  Input,
  PageComponent,
  PageTitle,
  ProfileImage,
  SubmitButton,
} from "../../Components";
import { validateInput } from "../../utils/actions/formActions";
import { reducer } from "../../utils/reducers/formReducer";
import colors from "../../Constant/colors";
import {
  updateLoggedInUser,
  userLogout,
} from "../../utils/actions/authActions";
import { updateLoggedInUserData } from "../../store/authSlice";

const SettingsScreen = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const firstName = userData.firstName || "";
  const lastName = userData.lastName || "";
  const email = userData.email || "";
  const about = userData.about || "";

  const initialState = {
    inputValues: {
      firstName,
      lastName,
      email,
      about,
    },

    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const [isLoading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const savehandler = useCallback(async () => {
    const updatedValues = formState.inputValues;

    try {
      setLoading(true);
      await updateLoggedInUser(userData.userId, updatedValues);
      dispatch(updateLoggedInUserData({ newData: updatedValues }));
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.log("Error on saveHandler:::::", error);
    } finally {
      setLoading(false);
    }
  }, [formState, dispatch]);

  const hasChanged = () => {
    const curruntValue = formState.inputValues;

    return (
      curruntValue.firstName !== firstName ||
      curruntValue.lastName !== lastName ||
      curruntValue.email !== email ||
      curruntValue.about !== about
    );
  };

  return (
    <PageComponent>
      <PageTitle title={"Settings"} />

      <ScrollView contentContainerStyle={styles.container}>
        <ProfileImage
          size={80}
          userId={userData.userId}
          uri={userData.profilePicture}
          showEditButton={true}
        />

        <Input
          id={"firstName"}
          label={"First Name"}
          iconName={"user"}
          iconSize={24}
          iconPack={Feather}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          error={formState.inputValidities["firstName"]}
          initialValue={userData.firstName}
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
          initialValue={userData.lastName}
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
          initialValue={userData.email}
        />
        <Input
          id={"about"}
          label={"About"}
          iconName={"user"}
          iconSize={24}
          iconPack={Feather}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          error={formState.inputValidities["about"]}
          initialValue={userData.about}
        />

        {showSuccessMessage && (
          <View style={styles.msgContainer}>
            <Text style={styles.txtMsg}>Data saved successfully</Text>
          </View>
        )}

        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={colors.primaryColor}
            style={{ marginTop: 20 }}
          />
        ) : hasChanged() ? (
          <SubmitButton
            title={"Save"}
            onPress={savehandler}
            style={{ marginTop: 20 }}
            disabled={!formState.formIsValid}
          />
        ) : (
          <></>
        )}

        <SubmitButton
          title={"Logout"}
          onPress={() => dispatch(userLogout())}
          style={{ marginTop: 20 }}
          color={colors.red}
        />
      </ScrollView>
    </PageComponent>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  msgContainer: {
    marginTop: 10,
  },
  txtMsg: {
    color: colors.primaryColor,
  },
});
