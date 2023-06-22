import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PageComponent, SignInForm, SignUpForm } from "../../Components";
import colors from "../../Constant/colors";
import Logo from "../../assets/images/logo.png";

const AuthScreen = () => {
  const [isSingUp, setIsSingUp] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <PageComponent>
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "height" : undefined}
            keyboardVerticalOffset={100}
          >
            <View style={styles.imageContainer}>
              <Image source={Logo} style={styles.image} resizeMode="contain" />
            </View>

            {isSingUp ? <SignUpForm /> : <SignInForm />}

            <TouchableOpacity
              onPress={() => setIsSingUp((prevState) => !prevState)}
              style={styles.linkContainer}
            >
              <Text style={styles.link}>{`Switch to ${
                isSingUp ? "Sign In" : "Sign Up"
              }`}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </PageComponent>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "50%",
  },
  linkContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  link: {
    color: colors.blue,
    fontFamily: "medium",
    letterSpacing: 0.3,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
});
