import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import {
  ChatListScreen,
  ChatScreen,
  ChatSettingsScreen,
  NewChatScreen,
  SettingsScreen,
} from "../Container";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerTitle: "", headerShadowVisible: false }}
    >
      <Tab.Screen
        name={"ChatListScreen"}
        component={ChatListScreen}
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"SettingsScreen"}
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name={"Home"}
          component={TabNavigator}
          options={{ headerShown: false, headerTitle: "" }}
        />
        <Stack.Screen
          name={"ChatScreen"}
          component={ChatScreen}
          options={{ headerTitle: "", headerBackTitle: "Back" }}
        />
        <Stack.Screen
          name={"ChatSettingsScreen"}
          component={ChatSettingsScreen}
          options={{ headerShown: false, headerTitle: "Settings" }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "containedModal" }}>
        <Stack.Screen name={"NewChatScreen"} component={NewChatScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default MainNavigator;
