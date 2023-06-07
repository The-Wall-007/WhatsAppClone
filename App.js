import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplaceScreen from "expo-splash-screen";
import * as Fonts from "expo-font";

SplaceScreen.preventAutoHideAsync();

export default function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    const loadingFonts = async () => {
      try {
        await Fonts.loadAsync({
          black: require("./assets/fonts/Roboto-Black.ttf"),
          blackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
          bold: require("./assets/fonts/Roboto-Bold.ttf"),
          boldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
          italic: require("./assets/fonts/Roboto-Italic.ttf"),
          light: require("./assets/fonts/Roboto-Light.ttf"),
          lightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
          medium: require("./assets/fonts/Roboto-Medium.ttf"),
          mediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
          regular: require("./assets/fonts/Roboto-Regular.ttf"),
          thin: require("./assets/fonts/Roboto-Thin.ttf"),
          thinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
        });
      } catch (error) {
        console.log.error();
      } finally {
        setIsAppLoaded(true);
      }
    };

    loadingFonts();
  }, []);

  const onLayout = useCallback(async () => {
    if (isAppLoaded) {
      await SplaceScreen.hideAsync();
    }
  }, [isAppLoaded]);

  if (!isAppLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.container} onLayout={onLayout}>
      <SafeAreaView>
        <Text style={styles.label}>
          Open up App.js to start working on your app!
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  label: {
    fontFamily: "boldItalic",
  },
});
