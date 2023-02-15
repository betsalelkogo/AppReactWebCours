import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar, StyleSheet } from "react-native";

import Home from "./Home";
import Settings from "./Settings";
import AddPost from "./PostAdd";
import MyColors from "../MyColors";
import { FC } from "react";

const TabsStack: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <StatusBar hidden={true} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName: any;
            let iconSize: any = 25;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Post") {
              iconName = "add-circle";
              iconSize = 45;
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: MyColors.primary,
          tabBarInactiveTintColor: "rgba(200, 200, 200, 1)",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "white",
            borderRadius: 15,
            height: 70,
            position: "absolute",
            bottom: 10,
            left: 10,
            right: 10,
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Post" component={AddPost} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </>
  );
};

export default TabsStack;
