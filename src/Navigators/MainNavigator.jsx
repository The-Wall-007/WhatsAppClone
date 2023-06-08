import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import {
  ChatListScreen,
  ChatScreen,
  ChatSettingsScreen,
  SettingsScreen,
} from "../Container";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerTitle: "" }}>
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
        name={"ChatSettingsScreen"}
        component={ChatSettingsScreen}
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
        name={"SettingsScreen"}
        component={SettingsScreen}
        options={{ headerShown: false, headerTitle: "Settings" }}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;
