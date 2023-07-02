import "react-native-gesture-handler";
import { useCallback, useEffect, useState } from "react";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplaceScreen from "expo-splash-screen";
import * as Fonts from "expo-font";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MenuProvider } from "react-native-popup-menu";

import AppNavigator from "./src/Navigators/AppNavigator";
import { store } from "./src/store";

// AsyncStorage.clear();

LogBox.ignoreAllLogs();

SplaceScreen.preventAutoHideAsync();

export default function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    const loadingFonts = async () => {
      try {
        await Fonts.loadAsync({
          black: require("./src/assets/fonts/Roboto-Black.ttf"),
          blackItalic: require("./src/assets/fonts/Roboto-BlackItalic.ttf"),
          bold: require("./src/assets/fonts/Roboto-Bold.ttf"),
          boldItalic: require("./src/assets/fonts/Roboto-BoldItalic.ttf"),
          italic: require("./src/assets/fonts/Roboto-Italic.ttf"),
          light: require("./src/assets/fonts/Roboto-Light.ttf"),
          lightItalic: require("./src/assets/fonts/Roboto-LightItalic.ttf"),
          medium: require("./src/assets/fonts/Roboto-Medium.ttf"),
          mediumItalic: require("./src/assets/fonts/Roboto-MediumItalic.ttf"),
          regular: require("./src/assets/fonts/Roboto-Regular.ttf"),
          thin: require("./src/assets/fonts/Roboto-Thin.ttf"),
          thinItalic: require("./src/assets/fonts/Roboto-ThinItalic.ttf"),
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
    <Provider store={store}>
      <SafeAreaProvider onLayout={onLayout}>
        <MenuProvider>
          <AppNavigator />
        </MenuProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
