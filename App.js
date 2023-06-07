import "react-native-gesture-handler";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplaceScreen from "expo-splash-screen";
import * as Fonts from "expo-font";
import AppNavigator from "./src/Navigators/AppNavigator";

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
    <SafeAreaProvider onLayout={onLayout}>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
